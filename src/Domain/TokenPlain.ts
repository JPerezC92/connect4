import { CoordsPlain } from "./CoordsPlain";
import { PlayerPlain } from "./PlayerPlain";

export interface TokenPlain {
  coords: CoordsPlain;
  player?: PlayerPlain;
}
