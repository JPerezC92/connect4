import { Board } from "./Board";
import { PlayerPlain } from "./PlayerPlain";
import { Token } from "./Token";

export class Player {
  readonly name: string;
  readonly color: string;
  private _wonGames: number;

  public get wonGames(): number {
    return this._wonGames;
  }

  constructor(props: { name: string; color: string; wonGames?: number }) {
    this.name = props.name;
    this.color = props.color;
    this._wonGames = props.wonGames || 0;
  }

  static new(props: { name: string; color: string }): Player {
    return new Player({
      color: props.color,
      name: props.name,
    });
  }

  public isEqual(player: Player): boolean {
    return this.color === player.color && this.name === player.name;
  }

  public markToken(props: { board: Board; tokenAvailable: Token }): Board {
    const { tokenAvailable, board } = props;

    const value = board.value.map((row) =>
      row.map((t) =>
        t.coordsAreEqual(tokenAvailable.coords)
          ? Token.create({
              ...tokenAvailable,
              player: Player.new({ ...this }),
            })
          : t
      )
    );

    return new Board({ ...board, value: [...value] });
  }

  public increaseWonGames(): void {
    this._wonGames = this._wonGames + 1;
  }

  public resetWonGames(): void {
    this._wonGames = 0;
  }

  public toPlain(): PlayerPlain {
    return {
      name: this.name,
      color: this.color,
      wonGames: this._wonGames,
    };
  }

  public static fromPlain(props: PlayerPlain): Player {
    return new Player({
      color: props.color,
      name: props.name,
      wonGames: props.wonGames,
    });
  }
}
