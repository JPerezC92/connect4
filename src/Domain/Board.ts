import { Coords } from "./Coords";
import { forInRange } from "./range";
import { Token } from "./Token";

export class Board {
  value: Token[][];
  readonly rows: number = 0;
  readonly columns: number = 0;
  public readonly _tokensInRowToWin: number = 4;

  public get maxAxisY(): number {
    return this.rows - 1;
  }
  public get maxAxisX(): number {
    return this.columns - 1;
  }

  constructor(props: { value: Token[][]; rows: number; columns: number }) {
    const { value, rows, columns } = props;
    this.columns = columns;
    this.rows = rows;

    this.value = value.length > 0 ? value : this.createBoard({ columns, rows });
  }

  static createDefaultBoard(): Board {
    return new Board({
      value: [],
      rows: 6,
      columns: 7,
    });
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
        (_, x): Token => Token.create({ coords: Coords.new({ x, y }) })
      )
    );

    return tokenMatrix;
  }

  public getColumns(): Token[][] {
    const tokenList = this.value.flat();
    const tokenColumnList: Token[][] = forInRange(this.maxAxisX).map(
      (_, x): Token[] => tokenList.filter((token) => token.coords.x === x)
    );

    return tokenColumnList;
  }

  public getDiagonals(): Token[][] {
    let initialCoords: Coords;

    let tokenDiagonalsList: Token[][] = [];
    const tokenList = this.value.flat();

    const topLeftDiagonals = forInRange(this.maxAxisY)
      .map((_, y) => {
        initialCoords = Coords.new({ x: 0, y });

        return forInRange(this.maxAxisY - y)
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

    const topRigthDiagonals = forInRange(this.maxAxisX)
      .map((_, x) => {
        initialCoords = Coords.new({ x: ++x, y: 0 });

        return forInRange(this.maxAxisX - x)
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

    const topLeftDiagonalsInverse = forInRange(this.maxAxisY)
      .map((_, y): Token[] => {
        initialCoords = Coords.new({ x: this.columns, y });

        return forInRange(this.maxAxisY - y)
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

    const topRigthDiagonalsInverse = forInRange(this.maxAxisX)
      .map((_, x): Token[] => {
        initialCoords = Coords.new({ x: x, y: 0 });

        return forInRange(this.maxAxisY)
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
      ...topLeftDiagonals,
      ...topRigthDiagonals,
      ...topLeftDiagonalsInverse,
      ...topRigthDiagonalsInverse,
    ];

    return tokenDiagonalsList;
  }
}
