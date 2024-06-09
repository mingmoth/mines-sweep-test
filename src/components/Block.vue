<script setup>
import { ref } from 'vue'

defineProps({
  block: {
    type: Object,
    default: () => ({
      mines: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })
  }
})

const emit = defineEmits(['reveal', 'flag'])

</script>

<template>
  <div
    @click="emit('reveal')"
    @contextmenu="emit('flag')"
    class="block"
  >
    {{ block.mines ? '*' : block.adjacent ? block.adjacent : '' }}
  </div>
</template>

<style scoped>
.block {
  width: 20px;
  height: 20px;
  border: 1px solid grey;
  background-color: lightgray;
  cursor: pointer;
  line-height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.block:hover {
  background-color: darkgray;
}
</style>
