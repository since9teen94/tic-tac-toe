import { useEffect, useState } from 'react'
import styles from './Board.module.css'

const reset = () => {
    let divs = [...document.getElementById('board').children]
    divs.map(y => y.innerText = '')
    divs.map(y => y.classList.remove('X'))
    divs.map(y => y.classList.remove('O'))
}

const Board = (props) => {
    const board = [1,2,3,4,5,6,7,8,9]
    const [winner, setWinner] = useState(false)
    const [turn, setTurn] = useState(true)
    const winConditions = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [7,5,3] ]
    const handleClick = (e) => {
        const player = turn ? 'X' : 'O'
        const thisDiv = document.getElementById(e.target.id)
        if ([...thisDiv.classList].includes('X') || [...thisDiv.classList].includes('O')) {
            return 
        }
        thisDiv.classList.add(player)
        thisDiv.innerText = player
        if (checkWin()) {
            return
        } else {
            setTurn(!turn)
        }
    } 
    const checkWin = () => {
        const xSpaces = [...document.getElementsByClassName('X')].map(space => parseInt(space.id))
        const oSpaces = [...document.getElementsByClassName('O')].map(space => parseInt(space.id))
        const won = (arr) => {
            return (arr.every(x => xSpaces.includes(x)) || arr.every(o => oSpaces.includes(o))) ? true : false
        }
        if (xSpaces.length + oSpaces.length === 9) {
            setWinner('none')
        }
        if (winConditions.some(arr => won(arr))) {
            setWinner(true)
        } 
    }
    useEffect(() => {
        if (winner === true) {
            alert(`Winner is ${turn ? 'O' : 'X'}`)
            setWinner(false)
            reset()
        }
        if (winner === 'none') {
            alert("No winner, resetting the game")
            setWinner(false)
            reset()
        }
    }, [winner])
    return (
        <div className={styles.board} id="board">
            {board.map(space => <div className={styles.space} key={space} id={space} onClick={handleClick}></div>)}
        </div>
    )
}

export default Board;