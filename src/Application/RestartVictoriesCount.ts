import { Connect4Repository } from "src/Domain/Connect4Repository";
import { Player } from "src/Domain/Player";
import { PlayerList } from "src/Domain/PlayerList";
import { UseCase } from "./UseCase";

interface Input {
  players: Player[];
}

export const RestartVictoriesCount: (props: {
  connect4Repository: Connect4Repository;
}) => UseCase<void, Input> = ({ connect4Repository }) => {
  return {
    execute: ({ players }) => {
      const playerList = PlayerList.new({ value: players });

      playerList.restartVictories();

      connect4Repository.updatePlayers(playerList.value);
    },
  };
};
