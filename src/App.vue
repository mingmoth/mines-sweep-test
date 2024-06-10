<script setup>
import { nextTick, ref, watch, watchEffect } from 'vue'
import Block from './components/Block.vue'
import { checkLose, checkWin, generateBlocks, revealBlock } from './block'

const statuses = {
  ready: 'ready',
  playing: 'playing',
  won: 'won',
  lose: 'lose',
}

const gameLevels = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
}

const gameLevelSettings = {
  easy: {
    width: 9,
    height: 9,
    mines: 10,
  },
  medium: {
    width: 16,
    height: 16,
    mines: 40,
  },
  hard: {
    width: 30,
    height: 16,
    mines: 99,
  },
}

const gameStatus = ref(statuses.ready)
const gameLevel = ref(gameLevels.easy)
const blocks = ref(generateBlocks(gameLevelSettings[gameLevel.value].width, gameLevelSettings[gameLevel.value].height, gameLevelSettings[gameLevel.value].mines))

function startGame() {
  if(gameStatus.value === statuses.ready) {
    gameStatus.value = statuses.playing
  }
}

function flagBlock(x, y) {
  blocks.value[x][y].flagged = !blocks.value[x][y].flagged
}

function resetGame() {
  gameStatus.value = statuses.ready
  blocks.value = generateBlocks(gameLevelSettings[gameLevel.value].width, gameLevelSettings[gameLevel.value].height, gameLevelSettings[gameLevel.value].mines)
}

watch(() => gameLevel.value, () => {
  blocks.value = generateBlocks(gameLevelSettings[gameLevel.value].width, gameLevelSettings[gameLevel.value].height, gameLevelSettings[gameLevel.value].mines)
})

watchEffect(() => {
  console.log('watchEffect')
  const status = gameStatus.value
  gameStatus.value = checkLose(blocks.value)
    ? statuses.lose
      : checkWin(blocks.value)
      ? statuses.won
        : status
  nextTick(() => {
    if(gameStatus.value === statuses.lose) {
      setTimeout(() => {
        alert('You lose!')
      }, 200)
    } else if(gameStatus.value === statuses.won) {
      setTimeout(() => {
        alert('You win!')
      }, 200)
    }
  })
})

</script>

<template>
  <h1>Mines Sweep</h1>
  <div class="controls">
    <button @click="resetGame">New Game</button>
    <button v-for="level in Object.keys(gameLevels)" :key="level" @click="gameLevel = gameLevels[level]"> {{ level }}</button>
  </div>
  <div class="blocks">
    <div
      v-for="(blockRow, index) in blocks"
      :key="index"
      class="block-row"
    >
      <Block
        v-for="block in blockRow"
        :key="`${block.x}-${block.y}`"
        :block="block"
        :disabled="gameStatus === statuses.lose || gameStatus === statuses.won"
        @reveal="startGame(); revealBlock(blocks, block.x, block.y)"
        @flag="flagBlock(block.x, block.y)"
      />
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 20px;
}

.blocks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.block-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
</style>
