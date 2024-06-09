<script setup>
import { nextTick, ref, watchEffect } from 'vue'
import Block from './components/Block.vue'
import { checkLose, checkWin, generateBlocks, revealBlock } from './block'

const statuses = {
  playing: 'playing',
  won: 'won',
  lose: 'lose',
}

const gameStatus = ref(statuses.playing)
const blocks = ref(generateBlocks(10, 10, 20))

function flagBlock(x, y) {
  blocks.value[x][y].flagged = !blocks.value[x][y].flagged
}

watchEffect(() => {
  gameStatus.value = checkLose(blocks.value)
    ? statuses.lose : checkWin(blocks.value)
    ? statuses.won : statuses.playing
  nextTick(() => {
    if(gameStatus.value === statuses.lose) {
      setTimeout(() => {
        alert('You lose!')
      }, 200)
    }
  })
})

</script>

<template>
  <h1>Mines Sweep</h1>
  <div>
    <button @click="blocks = generateBlocks(10, 10, 10)">Reset</button>
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
        :disabled="gameStatus === statuses.lose"
        @reveal="revealBlock(blocks, block.x, block.y)"
        @flag="flagBlock(block.x, block.y)"
      />
    </div>
  </div>
</template>

<style scoped>
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
