<template>
  <div class="h-full grid grid-rows-6 place-items-center">
    <modal :show="showPlayAgainModal" @close="showPlayAgainModal = false">
      <div class="flex flex-col justify-center items-center gap-y-3">
        <p>{{ gameStatus }}</p>
        <f-button @click="restartGame">
          <p>Play Again?</p>
        </f-button>
      </div>
    </modal>
    <header class="p-5 justify-self-start row-span-1 w-full">
      <h1 class="text-3xl text-center">Re-Tro-Toe</h1>
    </header>
    <main class="flex flex-col p-5 gap-y-12 row-span-3 row-start-2">
      <div class="">
        <p v-show="!isGameFinished" class="text-center">{{ gameStatus }}</p>
      </div>
      <div class="flex gap-x-8 justify-between">
        <div class="col-span-4 flex flex-col text-center">
          <p>Player One</p>
          <p class="text-2xl">{{ playerOneScore }}</p>
        </div>
        <div class="col-span-4 flex flex-col text-center">
          <p>Player Two</p>
          <p class="text-2xl">{{ playerTwoScore }}</p>
        </div>
      </div>
      <div class="mx-auto min-w-full max-w-xs grid grid-cols-3 grid-rows-3 gap-1">
        <game-cell v-for="cell in cellValues" :key="cell.id" @click="onCellClick(cell)">
          {{ cell.value }}
        </game-cell>
      </div>
    </main>
    <footer class="fixed bottom-0 w-full p-3 py-5 bg-emerald-400 text-center">
      <p>Made for <a href="https://adventofvue.com/" rel="noopener noreferrer" target="_blank">Advent of Vue
          2022</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import FButton from './components/FButton.vue'
import GameCell from './components/GameCell.vue'
import Modal from './components/Modal.vue'
import ICell from './interfaces/ICell'
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
useToggle(isDark)

const showPlayAgainModal = ref(false)

const gameStatus = ref<string>('Player One\'s Turn')
const isPlayerOneTurn = ref<boolean>(true)
const isGameFinished = ref<boolean>(false)
const turn = ref<number>(0)
const playerOneScore = ref<number>(0)
const playerTwoScore = ref<number>(0)
const cellValues = ref<Array<ICell>>(Array.from({ length: 9 }, (_, idx) => ({ id: idx, value: '' } as ICell)))

const restartGame = () => {
  cellValues.value = Array.from({ length: 9 }, (_, idx) => ({ id: idx, value: '' } as ICell))
  isPlayerOneTurn.value = true
  isGameFinished.value = false
  turn.value = 0
  gameStatus.value = 'Player One\'s Turn'
  showPlayAgainModal.value = false
}

const checkWinner = (cellValues: Array<ICell>) => {
  const winningCombinations = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ]

  const isWinner = winningCombinations.some((combination) => {
    const [a, b, c] = combination
    return cellValues[a].value && cellValues[a].value === cellValues[b].value && cellValues[a].value === cellValues[c].value
  })

  return isWinner
}

const onCellClick = (cell: ICell) => {
  if (isGameFinished.value) return
  if (cell.value) return // Add toast here
  cell.value = isPlayerOneTurn.value ? 'X' : 'O'
  isPlayerOneTurn.value = !isPlayerOneTurn.value
  gameStatus.value = isPlayerOneTurn.value ? "Player One's Turn" : "Player Two's Turn"
  const isWinner = checkWinner(cellValues.value)
  turn.value++
  if (turn.value === 9 && !isWinner) {
    showPlayAgainModal.value = true
    gameStatus.value = "It's a tie!"
  }
  if (isWinner) {
    showPlayAgainModal.value = true
    isGameFinished.value = true
    gameStatus.value = isPlayerOneTurn.value ? "Player Two Wins!" : "Player One Wins!"
    isPlayerOneTurn.value ? playerTwoScore.value++ : playerOneScore.value++
  }
}
</script>

<style scoped>

</style>