import { FC, useState } from "react";
import { Board } from "src/Domain/Board";
import { Conecta4Game } from "src/Domain/Conecta4";
import { Player } from "src/Domain/Player";
import { useConnect4 } from "./useConnect4";

const PlayerInfo: FC<{ player: Player }> = ({ player }) => {
  return (
    <span>
      <div>{player.name}</div>
      <div>{player.wonGames()}</div>
    </span>
  );
};

// const player1 = Player.new({
//   name: "Player 1",
//   color: "yellow",
//   turn: 1,
// });

// const player2 = Player.new({
//   name: "Player 2",
//   color: "red",
//   turn: 2,
// });

export const Connect4Screen: FC = () => {
  const { board, playerTurn, winner, players, doMovement } = useConnect4();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
      <span>{winner && `Winner: ${winner.name}`}</span>
      <span>{playerTurn && `Turn: ${playerTurn.name}`}</span>

      {board.value.map((row, indexY) => (
        <div key={indexY} style={{ display: "flex", gap: ".5rem" }}>
          {row.map((token, indexX) => (
            <button
              key={indexX}
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: token.color,
                borderRadius: "50%",
                border: "1px solid gray",
              }}
              onClick={() => doMovement({ board, playerTurn, token })}
            >
              x:{token.coords.x}
              y:{token.coords.y}
              {/* {token.player?.name} */}
            </button>
          ))}
        </div>
      ))}

      <div>
        {players.map((player) => (
          <PlayerInfo key={player.name} player={player}></PlayerInfo>
        ))}
      </div>
    </div>
  );
};
