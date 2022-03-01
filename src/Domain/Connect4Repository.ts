import { Board } from "./Board";
import { Player } from "./Player";

export interface Connect4Repository {
  cleanWinner(): void;
  updateBoard(board: Board): void;
  updateGameStartingMove(player: Player): void;
  updatePlayer(planer: Player): void;
  updatePlayers(players: Player[]): void;
  updatePlayerTurn(player: Player): void;
  updateWinner(winner: Player): void;
}
