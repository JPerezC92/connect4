import { Coords } from "./Coords";
import { Player } from "./Player";
import { TokenPlain } from "./TokenPlain";

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
      coords: Coords.new({ x: 0, y: 0 }),
    });
  }

  static new(props: { coords: Coords }): Token {
    return new Token({ coords: Coords.new(props.coords) });
  }

  public mark(props: { player: Player }): Token {
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

  public belongsTo(player: Player): boolean {
    return this.player?.isEqual(player) || false;
  }

  public toPlain(): TokenPlain {
    return {
      coords: this.coords.toPlain(),
      player: this.player?.toPlain(),
      color: this.color,
    };
  }

  public static fromPlain(plain: TokenPlain): Token {
    const { coords, player: player } = plain;

    return new Token({
      coords: Coords.fromPlain(coords),
      player: player && Player.fromPlain(player),
    });
  }
}
