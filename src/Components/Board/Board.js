import {useReducer} from "react";
import Cell from "../Cell/Cell";
import Dashboard from "../Dashboard/Dashboard";
import WinModal from "../WinModal/WinModal";
import './BoardStyle.css';

const BLANK = ' ';
export const PLAYER_1_STAMP = 'X';
export const PLAYER_2_STAMP = 'O';
const AMOUNT = 6
const UPDATE_BOARD = 0;
const TOGGLE_PLAYER_TURN = 1;
const INCREMENT_CLICKS = 2;
const DISPLAY_WIN_MODAL = 3;
const RESET_GAME = 4;
const MIN_CLICKS_TO_WIN = AMOUNT * 2 - 1;

const initialBoard = () => {
    const initial = [];
    for (let i = 0; i < AMOUNT; i++) {
        const row = []
        for (let j = 0; j < AMOUNT; j++) {
            row.push(BLANK);
        }
        initial.push(row)
    }
    return initial;
}

const initialState = {
    board: initialBoard(),
    player1Turn: true,
    clicks: 1,
    displayWin: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_BOARD:
            const board = state.board.map(row => [...row])
            board[action.x][action.y] = action.stamp;
            return {...state, board};
        case TOGGLE_PLAYER_TURN:
            return {...state, player1Turn: !state.player1Turn}
        case INCREMENT_CLICKS:
            return {...state, clicks: state.clicks + 1}
        case DISPLAY_WIN_MODAL:
            return {...state, displayWin: true}
        case RESET_GAME:
            return initialState;
        default:
            return state;
    }
};


const Board = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {board, player1Turn, clicks, displayWin} = state;

    const handleClick = (x, y) => {
        if (board[x][y] !== BLANK) return;
        dispatch({
            type: UPDATE_BOARD, x, y, stamp: player1Turn ? PLAYER_1_STAMP : PLAYER_2_STAMP
        });
        dispatch({type: TOGGLE_PLAYER_TURN});
        dispatch({type: INCREMENT_CLICKS});
        if (checkWin(x, y)) dispatch({type: DISPLAY_WIN_MODAL});
    };

    const resetGame = () => {
        dispatch({type: RESET_GAME});
    };


    const checkWin = (x, y) => {
        const currStamp = player1Turn ? PLAYER_1_STAMP : PLAYER_2_STAMP;
        const futureBoard = board.map(row => [...row]);
        futureBoard[x][y] = currStamp;
        if (clicks >= MIN_CLICKS_TO_WIN) {
            let win;
            if (futureBoard[x][0] === currStamp && futureBoard[x][AMOUNT - 1] === currStamp) {
                win = true;
                for (let i = 1; i < AMOUNT - 1; i++) {
                    if (futureBoard[x][i] !== currStamp) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
            if (futureBoard[0][y] === currStamp && futureBoard[AMOUNT - 1][y] === currStamp) {
                win = true;
                for (let i = 1; i < AMOUNT - 1; i++) {
                    if (futureBoard[i][y] !== currStamp) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
            if (x === y) {
                win = true;
                for (let i = 0; i < AMOUNT; i++) {
                    if (futureBoard[i][i] !== currStamp) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;

            }
            if (x === AMOUNT - 1 - y) {
                win = true;
                for (let i = 0; i < AMOUNT; i++) {
                    if (futureBoard[i][AMOUNT - 1 - i] !== currStamp) {
                        win = false;
                        break;
                    }
                }
                if (win) return true;
            }
        }
        return false;
    }


    return (
        <>
            <div className='board'>
                {board.map((row, xAxis) =>
                    <div key={`row${xAxis}`} className='board-row'
                         style={{pointerEvents: displayWin ? 'none' : "all"}}>{
                        row.map((content, yAxis) =>
                            <Cell
                                fontSize={300 / AMOUNT}
                                key={`cell${xAxis}:${yAxis}`}
                                onClick={handleClick}
                                content={content}
                                xAxis={xAxis}
                                yAxis={yAxis}
                                className='cell'/>
                        )}
                    </div>
                )
                }
                <Dashboard currentPlayer={player1Turn} reset={resetGame} isWin={displayWin} clicks={clicks}/>
            </div>
            <WinModal player={player1Turn} display={displayWin}/>
        </>


    )
}

export default Board
