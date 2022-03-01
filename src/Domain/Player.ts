import { Board } from "./Board";
import { Token } from "./Token";

export class Player {
  readonly name: string;
  readonly color: string;
  private _wonGames: number = 0;

  constructor(props: { name: string; color: string }) {
    this.name = props.name;
    this.color = props.color;
  }

  static new(props: { name: string; color: string }): Player {
    return new Player({
      color: props.color,
      name: props.name,
    });
  }

  public wonGames(): number {
    return this._wonGames;
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
}
