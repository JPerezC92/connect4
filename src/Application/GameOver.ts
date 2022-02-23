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

      const currentPlayerTurnUpdated = Player.new({ ...currentPlayerTurn });

      connect4Repository.updateWinner(currentPlayerTurnUpdated);
      connect4Repository.updatePlayer(currentPlayerTurnUpdated);
    },
  };
};
