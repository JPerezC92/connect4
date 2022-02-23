import { Conecta4Game } from "./Conecta4";

export class Player {
  readonly name: string;
  readonly color: string;

  constructor(props: { name: string; color: string }) {
    this.name = props.name;
    this.color = props.color;
  }

  static createNew(props: { name: string; color: string }): Player {
    return new Player({ color: props.color, name: props.name });
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
}
