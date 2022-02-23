import type { NextPage } from "next";
import { Connect4Screen } from "src/Infrastructure/Connect4Screen/Connect4Screen";

const Home: NextPage = () => {
  return (
    <>
      <Connect4Screen />
    </>
  );
};

export default Home;
