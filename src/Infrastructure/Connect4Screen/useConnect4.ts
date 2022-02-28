import { useCallback, useRef, useState } from "react";
import { MarkToken } from "src/Application/MarkToken";
import { Board } from "src/Domain/Board";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";
import { Token } from "src/Domain/Token";

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
    const nextPlayer = players.find((p) => !p.isEqual(player));
    if (nextPlayer) {
      updatePlayerTurn(nextPlayer);
    }
  };

  const connect4Repository: Connect4Repository = {
    cleanWinner: () => setWinner(() => undefined),
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
    players,
    playerTurn,
    winner,
  };
};

export const useConnect4 = () => {
  const { connect4Repository, ...rest } = useStore();
  const { winner } = rest;

  const doMovement = useCallback(
    (props: { board: Board; playerTurn: Player; token: Token }) => {
      if (!winner) {
        const { board, playerTurn, token } = props;
        const markToken = MarkToken({ connect4Repository });

        markToken.execute({ board, playerTurn, token });
      }
    },

    [connect4Repository, winner]
  );

  return { ...rest, doMovement };
};
