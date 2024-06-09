export const block = {
  mines: false,
  revealed: false,
  flagged: false,
  adjacent: 0,
}

export function generateBlocks(x = 10, y = 10, minesAmount = 10) {
  let blocks = new Array(x).fill(0).map((_row, xIdx) => new Array(y).fill(0).map((_col, yIdx) => ({
    ...block, x: xIdx, y: yIdx })))
  return countAdjacentMines(seedMines(blocks, x, y, minesAmount), x, y)
}

function seedMines(blocks = [], x = 10, y = 10, minesAmount = 10) {
  for (let i = 0; i < minesAmount; i++) {
    let xPosition = Math.floor(Math.random() * x)
    let yPosition = Math.floor(Math.random() * y)
    console.log('xPosition', xPosition, 'yPosition', yPosition)
    if (blocks[xPosition][yPosition].mines) {
      i--
      continue
    } else {
      blocks[xPosition][yPosition].mines = true
    }
  }
  console.log('blocks', blocks)
  return blocks
}

function countAdjacentMines(blocks = [], x = 10, y = 10) {
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (blocks[i][j].mines) {
        continue
      } else {
        let count = 0
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            if(blocks[i + k] && blocks[i + k][j + l] && blocks[i + k][j + l].mines) {
              count++
            }
          }
        }
        blocks[i][j].adjacent = count
      }
    }
  }
  console.log('blocks', blocks)
  return blocks
}
