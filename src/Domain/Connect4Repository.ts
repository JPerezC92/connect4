import { Board } from "./Board";
import { Player } from "./Player";

export interface Connect4Repository {
  //   getGameOver(): boolean;
  //   getWinner(): Player;
  //   updateGameOver(gameOver: boolean): void;
  // currentPlayerTurn(): Player;
  // getBoard(): Board;
  cleanWinner(): void;
  nextPlayerTurn(currentPlayerTurn: Player): void;
  updateBoard(board: Board): void;
  updateBoard(board: Board): void;
  updatePlayer(planer: Player): void;
  updatePlayerTurn(player: Player): void;
  updateWinner(winner: Player): void;
}
