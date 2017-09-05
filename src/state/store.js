import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import Pieces from '../helpers/Pieces';

const initialState = {
    board: (new Array(20)).fill((new Array(12)).fill(0)),
    currentPiece: [
        [0,0,0],
        [0,1,0],
        [1,1,1]
    ],
    position: {
        x: 5,
        y: -2
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

const collides = (board, piece, nextPosition) => {
    const {x, y} = nextPosition;
    
    for(let i = 0; i < piece.length; i++) {
        for(let j = 0; j < piece[0].length; j++) {
            if(y+i >=0 && piece[i][j] && board[y+i][x+j]) {
                return true;
            }
        }
    }

    return false;
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_PIECE':
            const board = getBoardAfterInsert(state);
            const nextPiece = action.payload;

            return {
                board,
                position: {
                    x: 5,
                    y: -2
                },
                currentPiece: nextPiece,
                pieceRequired: false
            }
        case 'MOVE_DOWN':
        {
            const nextPosition = {
                x: state.position.x,
                y: Math.min(state.position.y + 1, state.board.length - state.currentPiece.length)
            };

            const doesCollide = collides(state.board, state.currentPiece, nextPosition);

            return {
                ...state,
                position: doesCollide ? state.position : nextPosition,
                pieceRequired: doesCollide || nextPosition.y + state.currentPiece.length > state.board.length - 1
            };
        }
        case 'MOVE_RIGHT':
        {
            const nextPosition = {
                x: Math.min(state.position.x + 1, state.board[0].length - state.currentPiece[0].length),
                y: state.position.y
            };

            const doesCollide = collides(state.board, state.currentPiece, nextPosition);

            return {
                ...state,
                position: doesCollide ? state.position : nextPosition
            };
        }
        case 'MOVE_LEFT':
        {
            const nextPosition = {
                x: Math.max(0,state.position.x - 1),
                y: state.position.y
            };

            const doesCollide = collides(state.board, state.currentPiece, nextPosition);

            return {
                ...state,
                position: doesCollide ? state.position : nextPosition
            }
        }
        default:
            return state;
    }
};

export default createStore(reducer, composeWithDevTools());