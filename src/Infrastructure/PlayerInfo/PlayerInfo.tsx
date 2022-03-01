import { FC } from "react";
import { Player } from "src/Domain/Player";

export const PlayerInfo: FC<{ player: Player }> = ({ player }) => {
  return (
    <span>
      <div>{player.name}</div>
      <div>Victorias: {player.wonGames()}</div>
    </span>
  );
};
