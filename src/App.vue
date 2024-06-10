<script setup>
import { nextTick, watch, watchEffect } from 'vue'
import Block from './components/Block.vue'
import { checkLose, checkWin, revealBlock } from './utils/logic'
import useTimer from './composables/useTimer'
import useMinesGame from './composables/useMinesGame'

const { count, startCount, seconds, endCount } = useTimer()
const { blocks, gameHint, gameStatus, gameLevel, gameLevels, isStart, statuses, startGame, flagBlock, resetGame } = useMinesGame()

watch(() => isStart.value, () => {
  if(isStart.value) {
    startCount()
    count()
  } else {
    endCount()
  }
})

watchEffect(() => {
  const status = gameStatus.value
  gameStatus.value = checkLose(blocks.value)
    ? statuses.lose
      : checkWin(blocks.value)
        ? statuses.won
          : status
  nextTick(() => {
    if (gameStatus.value === statuses.lose || gameStatus.value === statuses.won) {
      endCount()
      setTimeout(() => {
        alert(`You ${gameStatus.value}!`)
      }, 200)
    }
  })
})

</script>

<template>
  <h1>Mines Sweep</h1>
  <div class="controls">
    <button @click="resetGame">New Game</button>
    <button
      v-for="level in Object.keys(gameLevels)"
      :key="level"
      @click="gameLevel = gameLevels[level]"
    >
      {{ level }}
    </button>
  </div>
  <div class="hint">
    <span>{{ gameHint }}</span> <span v-if="isStart"> {{ seconds }}s</span>
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

.hint {
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
