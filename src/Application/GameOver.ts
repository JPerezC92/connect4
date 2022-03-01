import { Board } from "src/Domain/Board";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";
import { PlayerList } from "src/Domain/PlayerList";
import { UseCase } from "./UseCase";

interface Input {
  currentPlayerTurn: Player;
  playerList: PlayerList;
  gameStartingMove: Player;
}

export const GameOver: (props: {
  connect4Repository: Connect4Repository;
}) => UseCase<void, Input> = ({ connect4Repository }) => {
  return {
    execute: ({ currentPlayerTurn, gameStartingMove, playerList }) => {
      const nextPlayerTurn = playerList.nextPlayerTurn(gameStartingMove);
      currentPlayerTurn.increaseWonGames();

      connect4Repository.updatePlayer(currentPlayerTurn);
      connect4Repository.updateWinner(currentPlayerTurn);

      setTimeout(() => {
        connect4Repository.updateBoard(Board.createDefaultBoard());
        connect4Repository.updatePlayerTurn(nextPlayerTurn);
        connect4Repository.updateGameStartingMove(nextPlayerTurn);
        connect4Repository.cleanWinner();
      }, 2500);
    },
  };
};
