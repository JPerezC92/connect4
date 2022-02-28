import { Board } from "src/Domain/Board";
import { BoardService } from "src/Domain/BoardService";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";
import { Token } from "src/Domain/Token";
import { GameOver } from "./GameOver";
import { UseCase } from "./UseCase";

interface Input {
  board: Board;
  playerTurn: Player;
  token: Token;
}

export const MarkToken: (props: {
  connect4Repository: Connect4Repository;
}) => UseCase<void, Input> = ({ connect4Repository }) => {
  const boardService = BoardService.new();
  const gameOver = GameOver({ connect4Repository });

  return {
    execute: ({ token, board, playerTurn }) => {
      const newBoard = playerTurn.markToken({ board, tokenSelected: token });

      connect4Repository.updateBoard(newBoard);

      if (boardService.checkForWinner({ board: newBoard, playerTurn })) {
        return gameOver.execute({ currentPlayerTurn: playerTurn });
      }

      connect4Repository.nextPlayerTurn(playerTurn);
    },
  };
};
