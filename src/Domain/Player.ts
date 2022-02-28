import { Board } from "./Board";
import { Conecta4Game } from "./Conecta4";
import { Token } from "./Token";

export class Player {
  readonly name: string;
  readonly color: string;
  readonly turn: number;
  private _wonGames: number = 0;

  constructor(props: { name: string; color: string; turn: number }) {
    this.name = props.name;
    this.color = props.color;
    this.turn = props.turn;
  }

  static new(props: { name: string; color: string; turn: number }): Player {
    return new Player({
      color: props.color,
      name: props.name,
      turn: props.turn,
    });
  }

  public wonGames(): number {
    return this._wonGames;
  }

  public selectBoardColumn(props: {
    conecta4Game: Conecta4Game;
    column: number;
  }): Conecta4Game {
    const { conecta4Game, column } = props;
    return conecta4Game.doMovement({ column });
  }

  public isEqual(player: Player): boolean {
    return this.color === player.color && this.name === player.name;
  }

  public markToken(props: { board: Board; tokenSelected: Token }): Board {
    const {
      tokenSelected: { coords },
      board,
    } = props;

    const tokenAvailableFound = board.findTokenAvailable({ column: coords.x });

    if (!tokenAvailableFound) return board;

    const value = board.value.map((row) =>
      row.map((t) =>
        t.coordsAreEqual(tokenAvailableFound.coords)
          ? Token.create({
              ...tokenAvailableFound,
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
}
