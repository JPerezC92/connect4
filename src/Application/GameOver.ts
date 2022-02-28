import { Board } from "src/Domain/Board";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";
import { UseCase } from "./UseCase";

interface Input {
  currentPlayerTurn: Player;
}

export const GameOver: (props: {
  connect4Repository: Connect4Repository;
}) => UseCase<void, Input> = ({ connect4Repository }) => {
  return {
    execute: ({ currentPlayerTurn }) => {
      currentPlayerTurn.increaseWonGames();

      // const currentPlayerTurnUpdated = Player.new({ ...currentPlayerTurn });

      connect4Repository.updatePlayer(currentPlayerTurn);
      connect4Repository.updatePlayer(currentPlayerTurn);
      connect4Repository.updateWinner(currentPlayerTurn);

      setTimeout(() => {
        connect4Repository.updateBoard(Board.createDefaultBoard());
        connect4Repository.nextPlayerTurn(currentPlayerTurn);
        connect4Repository.cleanWinner();
      }, 2500);
    },
  };
};
