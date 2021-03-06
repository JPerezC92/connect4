import { useCallback, useState } from "react";

import { Board } from "src/Domain/Board";
import { BoardPlain } from "src/Domain/BoardPlain";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { MarkToken } from "src/Application/MarkToken";
import { Player } from "src/Domain/Player";
import { PlayerList } from "src/Domain/PlayerList";
import { PlayerPlain } from "src/Domain/PlayerPlain";
import { RestartGame } from "src/Application/RestartGame";
import { RestartVictoriesCount } from "src/Application/RestartVictoriesCount";
import { Token } from "src/Domain/Token";
import { TokenPlain } from "src/Domain/TokenPlain";

const player1 = Player.new({
  color: "red",
  name: "Jugador 1",
}).toPlain();
const player2 = Player.new({
  color: "yellow",
  name: "Jugador 2",
}).toPlain();

const useStore = () => {
  const [board, setBoard] = useState(Board.createDefaultBoard().toPlain());
  const [players, setPlayers] = useState([player1, player2]);
  const [playerTurn, setPlayerTurn] = useState(players[0]);
  const [gameStartingMove, setGameStartingMove] = useState(players[0]);
  const [winner, setWinner] = useState<PlayerPlain | undefined>(undefined);

  const updateBoard = useCallback(
    (board: Board) => setBoard(() => board.toPlain()),
    []
  );
  const updatePlayerTurn = useCallback(
    (player: Player) => setPlayerTurn(() => player.toPlain()),
    []
  );
  const updateWinner = useCallback(
    (player: Player) => setWinner(() => player.toPlain()),
    []
  );
  const cleanWinner = useCallback(() => setWinner(() => undefined), []);

  const updatePlayers = useCallback((players: Player[]) => {
    const updateValueFn = (p: PlayerPlain) => {
      const playerFound = players.find((player) =>
        player.isEqual(Player.fromPlain(p))
      );
      return playerFound || p;
    };

    setPlayerTurn(updateValueFn);
    setGameStartingMove(updateValueFn);
    setPlayers(() => players.map(Player.fromPlain));
  }, []);

  const updateGameStartingMove = useCallback(
    (player: Player) => setGameStartingMove(() => player.toPlain()),
    []
  );
  const updatePlayer = useCallback((player: Player) => {
    setGameStartingMove((p) =>
      player.isEqual(Player.fromPlain(p)) ? player.toPlain() : p
    );
    setPlayers((ps) =>
      ps.map((p) =>
        player.isEqual(Player.fromPlain(p)) ? player.toPlain() : p
      )
    );
    setPlayerTurn((p) =>
      player.isEqual(Player.fromPlain(p)) ? player.toPlain() : p
    );
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
  const [isUpdating, setIsUpdating] = useState(false);

  const doMovement = useCallback(
    (props: {
      board: BoardPlain;
      players: PlayerPlain[];
      playerTurn: PlayerPlain;
      token: TokenPlain;
      gameStartingMove: PlayerPlain;
    }) => {
      setIsUpdating(() => true);

      const { board, playerTurn, token, players, gameStartingMove } = props;
      const markToken = MarkToken({ connect4Repository });

      markToken.execute({
        board: Board.fromPlain(board),
        gameStartingMove: Player.fromPlain(gameStartingMove),
        playerList: PlayerList.new({ value: players.map(Player.fromPlain) }),
        playerTurn: Player.fromPlain(playerTurn),
        token: Token.fromPlain(token),
      });

      setIsUpdating(() => false);
    },
    [connect4Repository]
  );

  const restartGame = useCallback(
    (props: { gameStartingMove: PlayerPlain }) => {
      const { gameStartingMove } = props;
      const restartGame = RestartGame({ connect4Repository });

      restartGame.execute({
        gameStartingMove: Player.fromPlain(gameStartingMove),
      });
    },
    [connect4Repository]
  );

  const restartVictories = useCallback(
    (props: { players: PlayerPlain[] }) => {
      const { players } = props;
      const restartVictoriesCount = RestartVictoriesCount({
        connect4Repository,
      });

      restartVictoriesCount.execute({ players: players.map(Player.fromPlain) });
    },
    [connect4Repository]
  );

  return { ...rest, isUpdating, doMovement, restartGame, restartVictories };
};
