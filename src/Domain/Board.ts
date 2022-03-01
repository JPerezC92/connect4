import { Coords } from "./Coords";
import { forInRange } from "./range";
import { Token } from "./Token";

export class Board {
  value: Token[][];
  readonly maxAxisY: number = 0;
  readonly maxAxisX: number = 0;
  public readonly _tokensInRowToWin: number = 4;

  constructor(props: { value: Token[][]; maxAxisY: number; maxAxisX: number }) {
    this.maxAxisX = props.maxAxisX;
    this.maxAxisY = props.maxAxisY;

    this.value = props.value.length > 0 ? props.value : this.createBoard();
  }

  public Rows(): number {
    return this.maxAxisY + 1;
  }

  public Columns(): number {
    return this.maxAxisX + 1;
  }

  static createDefaultBoard(): Board {
    return new Board({
      value: [],
      maxAxisY: 5,
      maxAxisX: 6,
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

  private createBoard(): Token[][] {
    const rows = this.Rows();
    const columns = this.Columns();

    const tokenMatrix: Token[][] = forInRange(rows).map((_, y): Token[] =>
      forInRange(columns).map(
        (_, x): Token => Token.create({ coords: Coords.new({ x, y }) })
      )
    );

    return tokenMatrix;
  }

  public getColumns(): Token[][] {
    const tokenList = this.value.flat();
    const tokenColumnList: Token[][] = forInRange(this.Columns()).map(
      (_, x): Token[] => tokenList.filter((token) => token.coords.x === x)
    );

    return tokenColumnList;
  }

  public getDiagonals(): Token[][] {
    let initialCoords: Coords;

    let tokenDiagonalsList: Token[][] = [];
    const tokenList = this.value.flat();

    const topLeftDiagonals = forInRange(this.Rows())
      .map((_, y) => {
        initialCoords = Coords.new({ x: 0, y });

        return forInRange(this.Rows() - y)
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

    const topRigthDiagonals = forInRange(this.Columns())
      .map((_, x) => {
        initialCoords = Coords.new({ x: ++x, y: 0 });

        return forInRange(this.Columns() - x)
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

    const topLeftDiagonalsInverse = forInRange(this.Rows())
      .map((_, y): Token[] => {
        initialCoords = Coords.new({ x: this.maxAxisX, y });

        return forInRange(this.Rows() - y)
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

    const topRigthDiagonalsInverse = forInRange(this.Columns())
      .map((_, x): Token[] => {
        initialCoords = Coords.new({ x: x, y: 0 });

        return forInRange(this.Rows())
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
