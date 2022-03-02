import { TokenPlain } from "./TokenPlain";

export interface BoardPlain {
  columns: number;
  rows: number;
  value: TokenPlain[][];
}
