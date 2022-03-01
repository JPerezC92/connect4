import { Player } from "./Player";

export class PlayerList {
  private _value: Player[];

  public get value(): Player[] {
    return this._value;
  }

  constructor(props: { value: Player[] }) {
    this._value = props.value;
  }

  static new(props: { value: Player[] }): PlayerList {
    return new PlayerList({ ...props });
  }

  public restartVictories(): void {
    this._value.forEach((player) => player.resetWonGames());
  }

  public nextPlayerTurn(currentPlayerTurn: Player): Player {
    const nextPlayer = this._value.find((p) => !p.isEqual(currentPlayerTurn));

    if (nextPlayer) return nextPlayer;
    return currentPlayerTurn;
  }
}
