import { Board } from "./Board";
import { Player } from "./Player";

export interface Connect4Repository {
  // getBoard(): Board;
  //   getGameOver(): boolean;
  updatePlayerTurn(player: Player): void;
  // currentPlayerTurn(): Player;
  //   getWinner(): Player;
  updateBoard(board: Board): void;
  //   updateGameOver(gameOver: boolean): void;
  //   updateTurn(turn: number): void;
  updatePlayer(planer: Player): void;
  nextPlayerTurn(currentPlayerTurn: Player): void;
  updateWinner(winner: Player): void;
}
