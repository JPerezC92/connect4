import { FC } from "react";
import { PlayerInfo } from "../PlayerInfo";
import { useConnect4 } from "./useConnect4";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      <span>{winner && `Winner: ${winner.name}`}</span>
      <span>{playerTurn && `Turn: ${playerTurn.name}`}</span>

      <button type="button" onClick={() => restartGame({ gameStartingMove })}>
        Reiniciar partida
      </button>

      <button type="button" onClick={() => restartVictories({ players })}>
        Reiniciar victorias
      </button>

      <div style={{ backgroundColor: "#3b6aee" }}>
        {board.value.map((row, indexY) => (
          <div
            key={indexY}
            style={{
              display: "flex",
              gap: ".5rem",
            }}
          >
            {row.map((token) => (
              <button
                key={`${token.coords.x}${token.coords.y}`}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: token.color,
                  borderRadius: "50%",
                  border: "1px solid gray",
                }}
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

      <div>
        {players.map((player) => (
          <PlayerInfo key={player.name} player={player} />
        ))}
      </div>
    </div>
  );
};
