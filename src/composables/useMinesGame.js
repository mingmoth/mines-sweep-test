import { computed, ref, watch } from 'vue'
import { generateBlocks } from '../utils/logic'

export default function useMinesGame() {
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

  const isStart = computed(() => gameStatus.value === statuses.playing)

  const gameHint = computed(() => {
    if (gameStatus.value === statuses.playing) {
      return `Time:`
    } else if (gameStatus.value === statuses.ready) {
      return 'Click to start'
    } else {
      return 'Start new game'
    }
  })

  function startGame() {
    if (gameStatus.value === statuses.ready) {
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
    resetGame()
  })

  return {
    blocks,
    gameHint,
    gameStatus,
    gameLevel,
    gameLevels,
    isStart,
    statuses,
    startGame,
    flagBlock,
    resetGame,
  }
}