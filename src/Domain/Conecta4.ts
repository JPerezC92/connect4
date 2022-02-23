import { Board } from "./Board";
import { Player } from "./Player";

export class Conecta4Game {
  players: {
    player1: Player;
    player2: Player;
  };
  readonly playerTurn: Player;

  readonly board: Board;

  private readonly _tokensInRowToWin: number = 4;
  public readonly winner?: Player;

  constructor(props: {
    board: Board;
    players: { player1: Player; player2: Player };
    playerTurn?: Player;
    winner?: Player;
  }) {
    this.board = props.board;
    this.players = props.players;
    this.playerTurn = props.playerTurn || props.players.player1;
    this.winner = props.winner;
  }

  public static create(props: {
    board: Board;
    players: {
      player1: Player;
      player2: Player;
    };
  }): Conecta4Game {
    return new Conecta4Game({ board: props.board, players: props.players });
  }

  //   public static fromIt(conecta4Game: Conecta4Game): Conecta4Game {
  //     return new Conecta4Game({
  //       board: conecta4Game.board,
  //       players: {
  //         player1: conecta4Game.players.player1,
  //         player2: conecta4Game.players.player2,
  //       },
  //       playerTurn: conecta4Game.playerTurn,
  //     });
  //   }

  public doMovement({ column }: { column: number }): Conecta4Game {
    let tokenAvailable = this.board.findTokenAvailable({ column });

    if (!tokenAvailable) return new Conecta4Game({ ...this });

    tokenAvailable = tokenAvailable.mark({ player: this.playerTurn });

    this.board.updateToken({ token: tokenAvailable });

    return new Conecta4Game({
      board: this.board,
      players: this.players,
      playerTurn: this.nextPlayerTurn(),
      winner: this.determineWinner(),
    });
  }

  private determineWinner() {
    if (this.board.inRowWinner({ playerTurn: this.playerTurn }))
      return this.playerTurn;
    if (this.board.inColumnWinner({ playerTurn: this.playerTurn }))
      return this.playerTurn;
  }

  public nextPlayerTurn(): Player {
    if (this.playerTurn.isEqual(this.players.player1))
      return this.players.player2;

    return this.players.player1;
  }
}
