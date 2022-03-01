import { useCallback, useState } from "react";

import { Board } from "src/Domain/Board";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { MarkToken } from "src/Application/MarkToken";
import { Player } from "src/Domain/Player";
import { PlayerList } from "src/Domain/PlayerList";
import { RestartGame } from "src/Application/RestartGame";
import { RestartVictoriesCount } from "src/Application/RestartVictoriesCount";
import { Token } from "src/Domain/Token";

const player1 = Player.new({
  color: "red",
  name: "Player 1",
});
const player2 = Player.new({
  color: "yellow",
  name: "Player 2",
});

const useStore = () => {
  const [board, setBoard] = useState(Board.createDefaultBoard());
  const [players, setPlayers] = useState([player1, player2]);
  const [playerTurn, setPlayerTurn] = useState(players[0]);
  const [gameStartingMove, setGameStartingMove] = useState(players[0]);
  const [winner, setWinner] = useState<Player | undefined>(undefined);

  const updateBoard = useCallback((board: Board) => setBoard(() => board), []);
  const updatePlayerTurn = useCallback(
    (player: Player) => setPlayerTurn(() => player),
    []
  );
  const updateWinner = useCallback(
    (player: Player) => setWinner(() => player),
    []
  );
  const cleanWinner = useCallback(() => setWinner(() => undefined), []);

  const updatePlayers = useCallback((players: Player[]) => {
    const updateValueFn = (p: Player) => {
      const playerFound = players.find((player) => player.isEqual(p));
      return playerFound || p;
    };
    setPlayerTurn(updateValueFn);
    setGameStartingMove(updateValueFn);
    setPlayers(() => players);
  }, []);

  const updateGameStartingMove = useCallback(
    (player: Player) => setGameStartingMove(() => player),
    []
  );
  const updatePlayer = useCallback((player: Player) => {
    setGameStartingMove((p) => (p.isEqual(player) ? player : p));
    setPlayers((ps) => ps.map((p) => (p.isEqual(player) ? player : p)));
    setPlayerTurn((p) => (p.isEqual(player) ? player : p));
  }, []);

  const connect4Repository: Connect4Repository = {
    cleanWinner,
    updateBoard,
    updateGameStartingMove,
    updatePlayer,
    updatePlayers,
    updatePlayerTurn,
    updateWinner,
  };

  return {
    board,
    gameStartingMove,
    connect4Repository,
    players,
    playerTurn,
    winner,
  };
};

export const useConnect4 = () => {
  const { connect4Repository, ...rest } = useStore();

  const doMovement = useCallback(
    (props: {
      board: Board;
      players: Player[];
      playerTurn: Player;
      token: Token;
      gameStartingMove: Player;
    }) => {
      const { board, playerTurn, token, players, gameStartingMove } = props;
      const markToken = MarkToken({ connect4Repository });

      markToken.execute({
        board,
        gameStartingMove,
        playerList: PlayerList.new({ value: players }),
        playerTurn,
        token,
      });
    },

    [connect4Repository]
  );

  const restartGame = useCallback(
    (props: { gameStartingMove: Player }) => {
      const { gameStartingMove } = props;
      const restartGame = RestartGame({ connect4Repository });

      restartGame.execute({ gameStartingMove });
    },
    [connect4Repository]
  );

  const restartVictories = useCallback(
    (props: { players: Player[] }) => {
      const { players } = props;
      const restartVictoriesCount = RestartVictoriesCount({
        connect4Repository,
      });

      restartVictoriesCount.execute({ players: players });
    },
    [connect4Repository]
  );

  return { ...rest, doMovement, restartGame, restartVictories };
};
