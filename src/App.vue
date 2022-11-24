<template>
  <div class="p-3 bg-zinc-100 dark:bg-slate-700 h-screen grid grid-cols-12 items-center font-retro font-[400]">
    <h1 class="col-span-12 text-3xl text-center text-gray-700 dark:text-gray-200">Re-Tro-Toe</h1>
    <div class="col-span-12 grid grid-cols-3 grid-rows-3">
      <game-cell></game-cell>
      <game-cell></game-cell>
      <game-cell></game-cell>
      <game-cell></game-cell>
      <game-cell></game-cell>
      <game-cell></game-cell>
      <game-cell></game-cell>
      <game-cell></game-cell>
      <game-cell></game-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCell from './components/GameCell.vue'
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

const isPlayerOneTurn = ref(true)
</script>

<style scoped>

</style>