import Pieces from '../helpers/Pieces';

export const newPiece = () => {
    const index = Math.floor(Math.random()*Pieces.length);

    return {
        type: 'NEW_PIECE',
        payload: Pieces[index]
    };
};