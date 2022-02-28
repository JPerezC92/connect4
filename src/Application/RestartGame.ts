import { Board } from "src/Domain/Board";
import { Connect4Repository } from "src/Domain/Connect4Repository";
import { UseCase } from "./UseCase";

interface Input {
  connect4Repository: Connect4Repository;
}

export const RestartGame: (props: {
  connect4Repository: Connect4Repository;
}) => UseCase<void> = ({ connect4Repository }) => {
  return {
    execute: () => {
      connect4Repository.updateBoard(Board.createDefaultBoard());
    },
  };
};
