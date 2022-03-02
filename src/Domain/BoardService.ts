import { Board } from "./Board";
import { Player } from "./Player";
import { Token } from "./Token";

export class BoardService {
  static new(): BoardService {
    return new BoardService();
  }

  public checkForWinner(props: { board: Board; playerTurn: Player }): boolean {
    const { board, playerTurn } = props;

    return (
      this.inRowWinner({ board, playerTurn }) ||
      this.inColumnWinner({ board, playerTurn }) ||
      this.inDiagonalWinner({ board, playerTurn })
    );
  }

  private inRowWinner(props: { board: Board; playerTurn: Player }): boolean {
    const { board, playerTurn } = props;
    for (const row of board.getRows()) {
      if (
        this.verifyArrayForWinner({
          playerTurn,
          tokenList: row,
          tokensInRowToWin: board.tokensInRowToWin,
        })
      ) {
        return true;
      }
    }

    return false;
  }

  private inColumnWinner(props: { board: Board; playerTurn: Player }): boolean {
    const { board, playerTurn } = props;
    for (const column of board.getColumns()) {
      if (
        this.verifyArrayForWinner({
          playerTurn,
          tokenList: column,
          tokensInRowToWin: board.tokensInRowToWin,
        })
      ) {
        return true;
      }
    }
    return false;
  }

  private inDiagonalWinner(props: {
    board: Board;
    playerTurn: Player;
  }): boolean {
    const { board, playerTurn } = props;
    for (const diagonal of board.getDiagonals()) {
      if (
        this.verifyArrayForWinner({
          playerTurn,
          tokenList: diagonal,
          tokensInRowToWin: board.tokensInRowToWin,
        })
      ) {
        return true;
      }
    }
    return false;
  }

  private verifyArrayForWinner(props: {
    tokenList: Token[];
    tokensInRowToWin: number;
    playerTurn: Player;
  }): boolean {
    const { tokenList, tokensInRowToWin, playerTurn } = props;

    let tokensInRowCounter = 0;

    if (tokenList.length < tokensInRowToWin) return false;

    for (let token of tokenList) {
      if (token.belongsTo(playerTurn)) tokensInRowCounter += 1;
      if (!token.belongsTo(playerTurn)) tokensInRowCounter = 0;

      if (tokensInRowCounter === tokensInRowToWin) return true;
    }

    return false;
  }
}
