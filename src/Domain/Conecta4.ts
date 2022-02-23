import { Board } from "./Board";
import { Player } from "./Player";
import { Token } from "./Token";

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

  public doMovement({ column }: { column: number }): Conecta4Game {
    let tokenAvailable = this.board.findTokenAvailable({ column });

    if (!tokenAvailable) return new Conecta4Game({ ...this });

    tokenAvailable = tokenAvailable.mark({ player: this.playerTurn });

    // this.board.updateToken({ token: tokenAvailable });
    const newBoard = this.playerTurn.markToken({
      board: this.board,
      token: tokenAvailable,
    });

    return new Conecta4Game({
      board: newBoard,
      players: this.players,
      playerTurn: this.nextPlayerTurn(),
      winner: this.determineWinner(newBoard),
    });
  }

  private determineWinner(board: Board): Player | undefined {
    if (this.inRowWinner(board)) return this.playerTurn;
    if (this.inColumnWinner(board)) return this.playerTurn;
    if (this.inDiagonalWinner(board)) return this.playerTurn;
  }

  public nextPlayerTurn(): Player {
    if (this.playerTurn.isEqual(this.players.player1))
      return this.players.player2;

    return this.players.player1;
  }

  public inColumnWinner(board: Board): boolean {
    for (const column of board.getColumns()) {
      if (this.verifyArrayForWinner(column)) return true;
    }
    return false;
  }

  public inDiagonalWinner(board: Board): boolean {
    for (const diagonal of board.getDiagonals()) {
      if (this.verifyArrayForWinner(diagonal)) return true;
    }
    return false;
  }

  private inRowWinner(board: Board): boolean {
    for (const row of board.value) {
      if (this.verifyArrayForWinner(row)) return true;
    }

    return false;
  }

  private verifyArrayForWinner(tokenList: Token[]): boolean {
    let trueCount = 0;

    if (tokenList.length < this._tokensInRowToWin) return false;

    for (let value of tokenList) {
      if (value.belongsTo(this.playerTurn)) trueCount += 1;
      if (!value.belongsTo(this.playerTurn)) trueCount = 0;

      if (trueCount === this._tokensInRowToWin) return true;
    }

    return false;
  }
}
