import { computed, ref } from 'vue'

export default function useTimer() {

  const start = ref(null)
  const end = ref(null)
  const interval = ref(null)

  const seconds = computed(() => {
    return Math.round((end.value - start.value) / 1000)
  })

  function startCount() {
    start.value = +Date.now()
    end.value = +Date.now()
  }

  function endCount() {
    clearInterval(interval.value)
  }

  function count() {
    if (interval.value) return

    interval.value = setInterval(() => {
      end.value = +Date.now()
    }, 1000)
  }

  return {
    start,
    end,
    seconds,
    count,
    endCount,
    startCount
  }
}