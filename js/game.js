'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍩'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}

var gBoard
var gModalTimeoutId
var gIsWinner = false
var gCherryInterval


function onInit() {
    resetGame()
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    console.log('gGame.foodCount', gGame.foodCount)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gCherryInterval = setInterval(addCherry, 15 * 1000);
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    //TODO
    board[1][1] = board[8][1] = board[1][8] = board[8][8] = SUPERFOOD
    gGame.foodCount -= 5
    return board
}


function addCherry() {
    var emptyCell = getEmptyCell(gBoard)
    if (!emptyCell) return
    // console.log('emptyCell = ', emptyCell)

    // MODEL
    gBoard[emptyCell.i][emptyCell.j] = CHERRY

    // DOM
    renderCell(emptyCell, CHERRY)
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

    

}

function gameOver() { /////
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)

    if (gIsWinner) {
        // DONE
        playSound()
        onToggleModal('YOU WIN!✨', true)
        renderCell(gPacman.location, '👑')
        const elModal = document.querySelector('.modal')
        elModal.style.backgroundColor = 'white'
        elModal.style.color = 'gold'

    } else {
        renderCell(gPacman.location, '🪦')
        onToggleModal('GAME OVER!', true)
    }
}

function resetGame() {
    onToggleModal()
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    gGame.isOn = true
    gGame.foodCount = 0
    gIsWinner = false
    gGhosts = []
}


function playSound() {
    var sound = new Audio('sound/pacmandeath.mp3');
    sound.play();
}

function onToggleModal(text = '', shouldOpen = false) {
    const elModal = document.querySelector('.modal')
    var elModalSub = document.querySelector('.modal h2')
    elModalSub.innerText = text
    elModal.style.display = shouldOpen ? 'block' : 'none'
}


function getEmptyCell(board) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell === EMPTY)
                emptyCells.push({
                    i: i,
                    j: j
                })
        }
    }
    const randomIdx = getRandomInt(0, emptyCells.length - 1)
    return emptyCells[randomIdx]
}