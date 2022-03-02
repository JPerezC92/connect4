import { FC } from "react";
import { Player } from "src/Domain/Player";
import { PlayerPlain } from "src/Domain/PlayerPlain";

import styles from "./PlayerInfo.module.scss";

export const PlayerInfo: FC<{ playerPlain: PlayerPlain }> = ({
  playerPlain,
}) => {
  return (
    <span className={styles.PlayerInfo}>
      <h3>{playerPlain.name}</h3>
      <div>Victorias: {playerPlain.wonGames}</div>
      <div
        className={styles.PlayerInfo_color}
        style={{ backgroundColor: playerPlain.color }}
      ></div>
    </span>
  );
};
