import { Player } from "./Player";

export class Token {
  readonly axisX: number;
  readonly axisY: number;
  readonly color: string;
  readonly player?: Player;

  constructor(props: {
    color: string;
    axisX: number;
    axisY: number;
    player?: Player;
  }) {
    this.color = props.color;
    this.axisX = props.axisX;
    this.axisY = props.axisY;
    this.player = props.player;
  }

  static createEmpty(): Token {
    return new Token({
      color: "white",
      axisY: 0,
      axisX: 0,
    });
  }

  mark(props: { player: Player }): Token {
    const { player } = props;

    const token = new Token({
      axisY: this.axisY,
      axisX: this.axisX,
      color: this.color,
      player,
    });

    return token;
  }

  public isAvailable(): boolean {
    return !this.player;
  }

  public coordsAreEqual(coords: { x: number; y: number }): boolean {
    return this.axisX === coords.x && this.axisY === coords.y;
  }
}
