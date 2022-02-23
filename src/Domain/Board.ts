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

  public defaultRows(): number {
    return this.maxAxisY + 1;
  }

  public defaultColumns(): number {
    return this.maxAxisX + 1;
  }

  static createDefaultBoard(): Board {
    return new Board({
      value: [],
      maxAxisY: 5,
      maxAxisX: 6,
    });
  }

  findTokenAvailable(props: { column: number }): Token | undefined {
    const { column } = props;
    const token = [...this.value]
      .reverse()
      .find((row) =>
        row.find((token) => token.coords.x === column && token.isAvailable())
      );

    return token && token[column];
  }

  createBoard(): Token[][] {
    const rows = this.defaultRows();
    const columns = this.defaultColumns();

    const tokenMatrix: Token[][] = forInRange(rows).map((_, y): Token[] =>
      forInRange(columns).map(
        (_, x): Token => Token.create({ coords: Coords.create({ x, y }) })
      )
    );

    return tokenMatrix;
  }

  updateToken(props: { token: Token }): void {
    const { token } = props;

    this.value = this.value.map((row) =>
      row.map((t) => (t.coordsAreEqual(token.coords) ? token : t))
    );
  }

  public getColumns(): Token[][] {
    const tokenList = this.value.flat();
    const tokenColumnList: Token[][] = forInRange(this.defaultColumns()).map(
      (_, x): Token[] => tokenList.filter((token) => token.coords.x === x)
    );

    return tokenColumnList;
  }

  public getDiagonals(): Token[][] {
    let initialCoords: Coords;

    let tokenDiagonalsList: Token[][] = [];
    const tokenList = this.value.flat();

    const topLeftDiagonals = forInRange(this.defaultRows())
      .map((_, y) => {
        initialCoords = Coords.create({ x: 0, y });

        return forInRange(this.defaultRows() - y)
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

    const topRigthDiagonals = forInRange(this.defaultColumns())
      .map((_, x) => {
        initialCoords = Coords.create({ x: ++x, y: 0 });

        return forInRange(this.defaultColumns() - x)
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

    const topLeftDiagonalsInverse = forInRange(this.defaultRows())
      .map((_, y): Token[] => {
        initialCoords = Coords.create({ x: this.maxAxisX, y });

        return forInRange(this.defaultRows() - y)
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

    const topRigthDiagonalsInverse = forInRange(this.defaultColumns())
      .map((_, x): Token[] => {
        initialCoords = Coords.create({ x: x, y: 0 });

        return forInRange(this.defaultRows())
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
