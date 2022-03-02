import { FC } from "react";

import { PlayerInfo } from "../PlayerInfo";
import { useConnect4 } from "../useConnect4";
import { VscDebugRestart } from "react-icons/vsc";

import styles from "./Connect4Screen.module.scss";

export const Connect4Screen: FC = () => {
  const {
    board,
    gameStartingMove,
    players,
    playerTurn,
    winner,
    doMovement,
    restartGame,
    restartVictories,
  } = useConnect4();

  return (
    <main className={styles.Connect4Screen}>
      <h1>Conecta4</h1>
      <header className={styles.Connect4ScreenHeader}>
        <span className={styles.Header_winner}>
          {winner && (
            <>
              <h2>Ganador</h2>
              <h2>{winner.name}</h2>
            </>
          )}
        </span>

        <span className={styles.Header_turn}>
          {playerTurn && (
            <>
              <h2>Turno</h2>
              <div
                className={styles.Circle_small}
                style={{ backgroundColor: playerTurn.color }}
              ></div>
            </>
          )}
        </span>

        <span className={styles.Header_actions}>
          <button type="button" onClick={() => restartVictories({ players })}>
            Reiniciar victorias
          </button>

          <button
            type="button"
            onClick={() => restartGame({ gameStartingMove })}
          >
            <VscDebugRestart />
          </button>
        </span>
      </header>

      <div className={styles.Connect4ScreenBoard}>
        {board.value.map((row, indexY) => (
          <div key={indexY} className={styles.Connect4ScreenBoard_row}>
            {row.map((token) => (
              <button
                key={`${token.coords.x}${token.coords.y}`}
                className={styles.Circle_medium}
                style={{ backgroundColor: token.color }}
                onClick={() =>
                  !winner &&
                  doMovement({
                    board,
                    gameStartingMove,
                    players,
                    playerTurn,
                    token,
                  })
                }
              ></button>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.Connect4ScreenPlayersBoard}>
        {players.map((player) => (
          <PlayerInfo key={player.name} playerPlain={player} />
        ))}
      </div>
    </main>
  );
};
