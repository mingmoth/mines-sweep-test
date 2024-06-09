<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    default: () => ({
      mines: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })
  },
  disabled: Boolean
})

const emits = defineEmits(['reveal', 'flag'])

function reveal() {
  if(props.disabled) return
  emits('reveal')
}

function flag() {
  if(props.disabled) return
  emits('flag')
}

const blockDisplay = computed(() => {
  if(props.block?.flagged) return 'F'
  if(props.block?.revealed) return props.block.mines ? '@' : props.block.adjacent ? props.block.adjacent : ''
})

</script>

<template>
  <div
    @click="reveal"
    @contextmenu.prevent="flag"
    :class="[
      'block',
      disabled && 'block-disabled',
      block.revealed ? 'block-revealed' : 'block-hidden',
      block.mines && block.revealed && 'block-mine',
    ]"
  >
    {{ blockDisplay }}
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

.block-hidden:hover {
  background-color: darkgray;
}

.block-revealed {
  background-color: #e4e6e8;
  border: 1px solid lightgray;
}

.block-mine {
  background-color: salmon;
}

.block-disabled {
  cursor: not-allowed;
}

.block-disabled:hover {
  background-color: lightgray;
}

.block-revealed:hover {
  background-color: #e4e6e8;
}

.block-mine:hover {
  background-color: salmon;
}
</style>
