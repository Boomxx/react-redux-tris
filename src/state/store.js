import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import Pieces from '../helpers/Pieces';

const initialState = {
    board: (new Array(20)).fill((new Array(12)).fill(0)),
    currentPiece: [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
    ],
    position: {
        x: 5,
        y: -2
    },
    pieceRequired: false
}

const getBoardAfterInsert = ({ board, currentPiece, position: { x, y } }) => {
    const copyBoard = board.map(row => row.slice(0));

    currentPiece.map((row, i) => row.map((_, j) => {
        const cell = currentPiece[i][j];

        if (cell && y+i >= 0) {
            copyBoard[y + i][x + j] = cell;
        }
    }));

    return copyBoard;
}

const collides = (board, piece, nextPosition) => {
    const { x, y } = nextPosition;

    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[0].length; j++) {
            if (y + i >= 0 && piece[i][j]) {
                if (board[y + i][x + j] || (x + j) >= board[0].length || (x + j) < 0) {
                    return true;
                }
            }
        }
    }

    return false;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                    y: state.position.y + 1
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
                    x: state.position.x + 1,
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
                    x: state.position.x - 1,
                    y: state.position.y
                };

                const doesCollide = collides(state.board, state.currentPiece, nextPosition);

                return {
                    ...state,
                    position: doesCollide ? state.position : nextPosition
                }
            }
        case 'ROTATE':
            {
                const rotatedPiece = state.currentPiece.map(row => row.slice(0));

                rotatedPiece = rotatedPiece[0].map((_,i) => rotatedPiece.map(row => row[i]).reverse());

                const doesCollide = collides(state.board, rotatedPiece, state.position);

                return {
                    ...state,
                    currentPiece: doesCollide ? state.currentPiece : rotatedPiece
                };
            }
        default:
            return state;
    }
};

export default createStore(reducer, composeWithDevTools());