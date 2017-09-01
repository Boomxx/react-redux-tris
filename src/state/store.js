import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
    board: (new Array(20)).fill((new Array(12)).fill(0)),
    currentPiece: [
        [0,0,0],
        [0,1,0],
        [1,1,1]
    ],
    position: {
        x: 5,
        y: 0
    },
    pieceRequired: false
}

const getBoardAfterInsert = ({ board, currentPiece, position: { x, y }}) => {
    const copyBoard = board.map(row => row.slice(0));
    
    currentPiece.map((row,i) => row.map((_,j) => {
        const cell = currentPiece[i][j];
        
        if(cell) {
            copyBoard[y+i][x+j] = cell;
        }
    }));

    return copyBoard;
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_PIECE':
            const board = getBoardAfterInsert(state);

            return {
                board,
                position: {
                    x: 5,
                    y: 0
                },
                currentPiece: [
                    [0,0,0],
                    [0,1,0],
                    [1,1,1]
                ],
                pieceRequired: false
            }
        case 'MOVE_DOWN':            
            return {
                ...state,
                position: {
                    x: state.position.x,
                    y: Math.min(state.position.y + 1, state.board.length - state.currentPiece.length)
                },
                pieceRequired: state.position.y >= 16
            };
        case 'MOVE_RIGHT':
            return {
                ...state,
                position: {
                    x: Math.min(state.position.x + 1, state.board[0].length - state.currentPiece[0].length),
                    y: state.position.y
                }
            };
        case 'MOVE_LEFT':
            return {
                ...state,
                position: {
                    x: Math.max(0,state.position.x - 1),
                    y: state.position.y
                }
            }
        default:
            return state;
    }
};

export default createStore(reducer, composeWithDevTools());