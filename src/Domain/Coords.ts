export class Coords {
  private readonly _x: number;
  private readonly _y: number;

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  constructor(props: { x: number; y: number }) {
    this._x = props.x;
    this._y = props.y;
  }

  public static new(props: { x: number; y: number }): Coords {
    return new Coords(props);
  }

  public nextLeftDownDiagonal(): Coords {
    return Coords.new({ x: this.x + 1, y: this.y + 1 });
  }

  public nextRightDownDiagonal(): Coords {
    return Coords.new({ x: this.x - 1, y: this.y + 1 });
  }

  public isEqual(object: Coords): boolean {
    return this.x === object.x && this.y === object.y;
  }
}
