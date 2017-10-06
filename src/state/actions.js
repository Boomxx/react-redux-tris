import * as types from "./types";
import Pieces from "../helpers/Pieces";

export const newPiece = () => {
  const index = Math.floor(Math.random() * Pieces.length);

  return {
    type: types.NEW_PIECE,
    payload: Pieces[index]
  };
};

export const startGame = () => {
  const index1 = Math.floor(Math.random() * Pieces.length);
  const index2 = Math.floor(Math.random() * Pieces.length);

  return {
    type: types.START_GAME,
    payload: {
      currentPiece: Pieces[index1],
      nextPiece: Pieces[index2]
    }
  };
};
