import { Board } from "src/Domain/Board";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";
import { UseCase } from "./UseCase";

interface Input {
  gameStartingMove: Player;
}

export const RestartGame: (props: {
  connect4Repository: Connect4Repository;
}) => UseCase<void, Input> = ({ connect4Repository }) => {
  return {
    execute: ({ gameStartingMove }) => {
      connect4Repository.updateBoard(Board.createDefaultBoard());
      connect4Repository.updatePlayerTurn(gameStartingMove);
    },
  };
};
