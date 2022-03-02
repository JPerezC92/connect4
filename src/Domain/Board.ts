import { BoardPlain } from "./BoardPlain";
import { Coords } from "./Coords";
import { forInRange } from "./range";
import { Token } from "./Token";

export class Board {
  public readonly tokensInRowToWin: number = 4;

  private _value: Token[][];
  readonly columns: number = 0;
  readonly rows: number = 0;

  public get maxAxisY(): number {
    return this.rows - 1;
  }
  public get maxAxisX(): number {
    return this.columns - 1;
  }
  public get value(): Token[][] {
    return this._value;
  }

  constructor(props: { value?: Token[][]; rows: number; columns: number }) {
    const { value, rows, columns } = props;
    this.columns = columns;
    this.rows = rows;

    this._value = value ? value : this.createBoard({ columns, rows });
  }

  static new(props: { rows: number; columns: number }): Board {
    const { rows, columns } = props;
    return new Board({ rows, columns });
  }

  static createDefaultBoard(): Board {
    return Board.new({ rows: 6, columns: 7 });
  }

  public findTokenAvailable(props: { column: number }): Token | undefined {
    const { column } = props;
    const token = [...this.value]
      .reverse()
      .find((row) =>
        row.find((token) => token.coords.x === column && token.isAvailable())
      );

    return token && token[column];
  }

  private createBoard({
    columns,
    rows,
  }: {
    columns: number;
    rows: number;
  }): Token[][] {
    const tokenMatrix: Token[][] = forInRange(rows).map((_, y): Token[] =>
      forInRange(columns).map(
        (_, x): Token => Token.new({ coords: Coords.new({ x, y }) })
      )
    );

    return tokenMatrix;
  }

  public getRows(): Token[][] {
    return [...this.value];
  }

  public getColumns(): Token[][] {
    const tokenList = this.value.flat();
    const tokenColumnList: Token[][] = forInRange(this.columns).map(
      (_, x): Token[] => tokenList.filter((token) => token.coords.x === x)
    );

    return tokenColumnList;
  }

  public getDiagonals(): Token[][] {
    let initialCoords: Coords;

    let tokenDiagonalsList: Token[][] = [];
    const tokenList = this.value.flat();

    const lowerLeftDownDiagonals = forInRange(this.rows)
      .map((_, y) => {
        initialCoords = Coords.new({ x: 0, y });

        return forInRange(this.rows - y)
          .map(() => {
            const diagonal = tokenList.filter((token) =>
              token.coords.isEqual(initialCoords)
            );
            initialCoords = initialCoords.nextLeftDownDiagonal();
            return diagonal;
          })
          .flat();
      })
      .filter((diagonal) => diagonal.length > 0);

    const upperLeftDownDiagonals = forInRange(this.columns)
      .map((_, x) => {
        initialCoords = Coords.new({ x: ++x, y: 0 });

        return forInRange(this.columns - x)
          .map(() => {
            const diagonal = tokenList.filter((token) =>
              token.coords.isEqual(initialCoords)
            );
            initialCoords = initialCoords.nextLeftDownDiagonal();
            return diagonal;
          })
          .flat();
      })
      .filter((diagonal) => diagonal.length > 0);

    const lowerRigthDownDiagonals = forInRange(this.rows)
      .map((_, y): Token[] => {
        initialCoords = Coords.new({ x: this.maxAxisX, y });

        return forInRange(this.rows - y)
          .map((): Token[] => {
            const diagonal = tokenList.filter((token) =>
              token.coords.isEqual(initialCoords)
            );
            initialCoords = initialCoords.nextRightDownDiagonal();
            return diagonal;
          })
          .flat();
      })
      .filter((diagonal) => diagonal.length > 0);

    const upperRigthDownDiagonals = forInRange(this.columns)
      .map((_, x): Token[] => {
        initialCoords = Coords.new({ x: x, y: 0 });

        return forInRange(this.rows)
          .map((): Token[] => {
            const diagonal = tokenList.filter((token) =>
              token.coords.isEqual(initialCoords)
            );

            initialCoords = initialCoords.nextRightDownDiagonal();
            return diagonal;
          })
          .flat();
      })
      .filter((diagonal) => diagonal.length > 0);

    tokenDiagonalsList = [
      ...tokenDiagonalsList,
      ...lowerLeftDownDiagonals,
      ...upperLeftDownDiagonals,
      ...lowerRigthDownDiagonals,
      ...upperRigthDownDiagonals,
    ];

    return tokenDiagonalsList;
  }

  public toPlain(): BoardPlain {
    return {
      columns: this.columns,
      rows: this.rows,
      value: this.value.map((row) => row.map((token) => token.toPlain())),
    };
  }

  public static fromPlain(props: BoardPlain): Board {
    const { value, columns, rows } = props;
    return new Board({
      columns,
      rows,
      value: value.map((v) => v.map(Token.fromPlain)),
    });
  }
}
