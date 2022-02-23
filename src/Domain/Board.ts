import { Player } from "./Player";
import { Token } from "./Token";

export class Board {
  value: Token[][];
  readonly defaultRows: number;
  readonly defaultColumns: number;
  // readonly players: {
  //   readonly player1: Player;
  //   readonly player2: Player;
  // };
  // readonly playerTurn: Player;
  // readonly winner?: Player;
  // tokensInRowToWin: number;

  constructor(props: {
    value: Token[][];
    defaultRows: number;
    defaultColumns: number;
    // players: {
    //   player1: Player;
    //   player2: Player;
    // };
    // playerTurn: Player;
    // winner?: Player;
    // tokensInRowToWin: number;
  }) {
    this.value = props.value;
    this.defaultRows = props.defaultRows;
    this.defaultColumns = props.defaultColumns;
  }

  static createEmptyBoard(): Board {
    const emptyBoard = new Board({
      value: [],
      defaultRows: 6,
      defaultColumns: 7,
    });

    return Board.createAxisX(Board.createAxisY(emptyBoard));
  }

  // doMovement(column: number): Board {
  //   let tokenAvailable = this.findTokenAvailable({ column });

  //   if (!tokenAvailable) return board;

  //   tokenAvailable = tokenAvailable.mark({ player: board.playerTurn });

  //   const newBoard = this.updateToken({ board, token: tokenAvailable });

  //   const boardWithWinner = this.determineWinner(newBoard);

  //   if (boardWithWinner) return boardWithWinner;

  //   return this.changeTurn(newBoard);
  // }

  findTokenAvailable(props: { column: number }): Token | undefined {
    const { column } = props;
    const token = [...this.value]
      .reverse()
      .find((row) =>
        row.find((token) => token.axisX === column && token.isAvailable())
      );

    return token && token[column];
  }

  static createAxisY(board: Board): Board {
    for (let index = 0; index < 6; index++) {
      board = new Board({ ...board, value: [...board.value, []] });
    }
    return new Board({ ...board });
  }

  static createAxisX(board: Board): Board {
    const tokenList = board.value;

    for (let indexY = 0; indexY < board.defaultRows; indexY++) {
      for (let indexX = 0; indexX < 7; indexX++) {
        tokenList[indexY][indexX] = new Token({
          ...Token.createEmpty(),
          axisY: indexY,
          axisX: indexX,
        });
      }
    }
    return new Board({ ...board, value: tokenList });
  }

  // changeTurn(board: Board): Board {
  //   return new Board({
  //     ...board,
  //     playerTurn:
  //       board.playerTurn === board.players.player1
  //         ? board.players.player2
  //         : board.players.player1,
  //   });
  // }

  updateToken(props: { token: Token }): void {
    const { token } = props;

    this.value = this.value.map((row) =>
      row.map((t) =>
        t.coordsAreEqual({ x: token.axisX, y: token.axisY }) ? token : t
      )
    );
  }

  verifyArrayForWinner(booleanList: boolean[]): boolean {
    let trueCount = 0;
    const trueQuantityToWin = 4;

    if (booleanList.length < trueQuantityToWin) return false;

    for (let value of booleanList) {
      if (value) trueCount++;
      if (!value) trueCount = 0;

      if (trueCount === trueQuantityToWin) return true;
    }

    return false;
  }

  inRowWinner(props: { playerTurn: Player }): boolean {
    const { playerTurn } = props;

    // // const player = { ...board.playerTurn };
    // const newBoard = { ...board };
    const boardWithBooleans = this.value.map((row) =>
      row.map((token) => token.player?.name === playerTurn.name)
    );

    for (let indexY = 0; indexY < this.defaultRows; indexY++) {
      const row = boardWithBooleans[indexY];
      if (this.verifyArrayForWinner(row)) return true;
    }

    return false;
  }

  inColumnWinner = (props: { playerTurn: Player }): boolean => {
    const { playerTurn } = props;
    // const player = { ...board.playerTurn };
    // const newBoard = { ...board };

    const tokenList = this.value.flat();
    for (let index = 0; index < this.defaultColumns; index++) {
      const column = tokenList
        .filter((token) => token.axisX === index)
        .map((token) => token.player?.name === playerTurn.name);

      if (this.verifyArrayForWinner(column)) return true;
    }

    return false;
  };

  // inDiagonalWinner = (board: Board) => {
  //   const player = { ...board.playerTurn };
  //   const newBoard = { ...board };

  //   for (
  //     let indexY = 0;
  //     indexY < newBoard.value.length - newBoard.tokensInRowToWin;
  //     indexY++
  //   ) {
  //     const tokenList = newBoard.value
  //       .flat()
  //       .filter((row) => row.axisY === indexY && row.axisX === 3);
  //   }
  // };

  // determineWinner(board: Board): Board | undefined {
  //   const winner = { ...board.playerTurn };
  //   const newBoard = new Board({ ...board });

  //   if (this.inRowWinner(newBoard))
  //     return new Board({ ...newBoard, winner: winner });
  //   if (this.inColumnWinner(newBoard))
  //     return new Board({ ...newBoard, winner: winner });
  // }
}
