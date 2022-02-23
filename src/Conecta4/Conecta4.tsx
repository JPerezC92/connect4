import { FC, useState } from "react";
import { Board } from "src/Domain/Board";
import { Conecta4Game } from "src/Domain/Conecta4";
import { Player } from "src/Domain/Player";

const player1 = Player.createNew({
  name: "Player 1",
  color: "yellow",
});

const player2 = Player.createNew({
  name: "Player 2",
  color: "red",
});

export const Conecta4: FC = () => {
  const [conecta4Game, setConecta4Game] = useState(
    Conecta4Game.create({
      board: Board.createEmptyBoard(),
      players: { player1, player2 },
    })
  );

  const { board, playerTurn } = conecta4Game;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
      <span>
        {conecta4Game.winner && `Winner: ${conecta4Game.winner.name}`}
      </span>

      {board.value.map((row, indexY) => (
        <div key={indexY} style={{ display: "flex", gap: ".5rem" }}>
          {row.map((token, indexX) => (
            <button
              key={indexX}
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: token.player?.color,
                borderRadius: "50%",
                border: "1px solid gray",
              }}
              onClick={() => {
                const newConecta4Game = playerTurn.selectBoardColumn({
                  conecta4Game,
                  column: token.axisX,
                });

                setConecta4Game(() => newConecta4Game);
              }}
            >
              {token.player?.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
