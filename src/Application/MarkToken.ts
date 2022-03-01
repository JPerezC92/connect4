import { Board } from "src/Domain/Board";
import { BoardService } from "src/Domain/BoardService";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";
import { PlayerList } from "src/Domain/PlayerList";
import { Token } from "src/Domain/Token";
import { GameOver } from "./GameOver";
import { UseCase } from "./UseCase";

interface Input {
  board: Board;
  playerList: PlayerList;
  playerTurn: Player;
  gameStartingMove: Player;
  token: Token;
}

export const MarkToken: (props: {
  connect4Repository: Connect4Repository;
}) => UseCase<void, Input> = ({ connect4Repository }) => {
  const boardService = BoardService.new();
  const gameOver = GameOver({ connect4Repository });

  return {
    execute: ({ board, gameStartingMove, playerList, playerTurn, token }) => {
      const tokenAvailable = board.findTokenAvailable({
        column: token.coords.x,
      });

      if (!tokenAvailable) return;

      const newBoard = playerTurn.markToken({ board, tokenAvailable });
      connect4Repository.updateBoard(newBoard);

      if (boardService.checkForWinner({ board: newBoard, playerTurn })) {
        return gameOver.execute({
          currentPlayerTurn: playerTurn,
          playerList,
          gameStartingMove,
        });
      }

      const nexPlayerTurn = playerList.nextPlayerTurn(playerTurn);
      connect4Repository.updatePlayerTurn(nexPlayerTurn);
    },
  };
};
