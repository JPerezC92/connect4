import { useCallback, useState } from "react";
import { Board } from "src/Domain/Board";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";

const useStore = () => {
  const [board, setBoard] = useState(Board.createDefaultBoard());
  const [players, setPlayers] = useState([
    Player.new({
      name: "Player 1",
      color: "yellow",
      turn: 1,
    }),
    Player.new({
      name: "Player 2",
      color: "red",
      turn: 2,
    }),
  ]);
  const [playerTurn, setPlayerTurn] = useState(players[0]);
  const [winner, setWinner] = useState<Player | undefined>(undefined);

  const updateBoard = useCallback((board: Board) => setBoard(() => board), []);
  const updatePlayerTurn = useCallback(
    (player: Player) => setPlayerTurn(() => player),
    []
  );
  const updateWinner = (player: Player) => setWinner(() => player);
  const nextPlayerTurn = (player: Player) => {
    const nextPlayer = players.find((p) => p.turn === player.turn + 1);
    if (nextPlayer) {
      updatePlayerTurn(nextPlayer);
    }
  };

  const connect4Repository: Connect4Repository = {
    updateBoard,
    updatePlayerTurn,
    updateWinner,
    nextPlayerTurn,
    updatePlayer: (player) => {
      setPlayers((players) =>
        players.map((p) => (p.isEqual(player) ? player : p))
      );
    },
  };

  return {
    board,
    connect4Repository,
    playerTurn,
    winner,
  };
};

export const useConnect4 = () => {
  const { board, connect4Repository } = useStore();

  const doMovement = useCallback(() => {}, []);

  return { board, doMovement };
};
