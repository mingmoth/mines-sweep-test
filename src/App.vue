<script setup>
import Block from './components/Block.vue'
import { generateBlocks } from './block'

const blocks = generateBlocks(10, 10, 10)

</script>

<template>
  <h1>Mines Sweep</h1>
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
