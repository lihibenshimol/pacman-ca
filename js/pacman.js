'use strict'

const PACMAN = '<img src="img/pacman.png">'
var gPacmanDirection = 'right'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN

}


function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return


    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
        console.log('gGame.foodCount:', gGame.foodCount)
        if (gGame.foodCount === 0) {
            gIsWinner = true
            gameOver()
        }
    }

    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        updateScore(1)
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhosts()
        }, 5000);
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML())
}


function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPacmanDirection = 'up'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacmanDirection = 'right'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacmanDirection = 'down'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacmanDirection = 'left'
            break;
    }
    return nextLocation
}


function getPacmanHTML() {
    var pacmanStyle = ''
    switch (gPacmanDirection) {
        case 'up':
            pacmanStyle = 'transform: rotateZ(270deg);'
            break;
        case 'right':
            pacmanStyle = 'transform: rotateZ(0deg);'
            break;
        case 'down':
            pacmanStyle = 'transform: rotateZ(90deg);'
            break;
        case 'left':
            pacmanStyle = 'transform: rotateY(180deg);'
            break;
    }
    return `<img style="${pacmanStyle}" src="img/pacman.png">`


}


function getPacmanStyle() {
    var pacmanStyle = ''
    switch (gPacmanDirection) {
        case 'up':
            pacmanStyle = 'rotate: 270deg;'
            break;
        case 'right':
            pacmanStyle = 'rotate: 0deg;'
            break;
        case 'down':
            pacmanStyle = 'rotate: 90deg;'
            break;
        case 'left':
            pacmanStyle = 'transform: scaleX(-1);'
            break;

        default:
            break;
    }

    return pacmanStyle
}