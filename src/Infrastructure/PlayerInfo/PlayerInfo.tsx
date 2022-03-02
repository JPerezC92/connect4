import { FC } from "react";
import { Player } from "src/Domain/Player";

import styles from "./PlayerInfo.module.scss";

export const PlayerInfo: FC<{ player: Player }> = ({ player }) => {
  return (
    <span className={styles.PlayerInfo}>
      <h3>{player.name}</h3>
      <div>Victorias: {player.wonGames()}</div>
      <div
        className={styles.PlayerInfo_color}
        style={{ backgroundColor: player.color }}
      ></div>
    </span>
  );
};
