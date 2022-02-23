import { Coords } from "./Coords";
import { Player } from "./Player";

export class Token {
  private readonly defaultColor = "white";
  readonly coords: Coords;
  readonly player?: Player;

  public get color(): string {
    return this.player?.color || this.defaultColor;
  }

  constructor(props: { coords: Coords; player?: Player }) {
    this.coords = props.coords;
    this.player = props.player;
  }

  static createEmpty(): Token {
    return new Token({
      coords: Coords.create({ x: 0, y: 0 }),
    });
  }

  static create(props: { coords: Coords; player?: Player }): Token {
    return new Token({
      coords: Coords.create(props.coords),
      player: props.player,
    });
  }

  mark(props: { player: Player }): Token {
    const { player } = props;

    const token = new Token({
      coords: this.coords,
      player,
    });

    return token;
  }

  public isAvailable(): boolean {
    return !this.player;
  }

  public coordsAreEqual(coords: Coords): boolean {
    return this.coords.isEqual(coords);
  }

  belongsTo(player: Player): boolean {
    return this.player?.isEqual(player) || false;
  }
}
