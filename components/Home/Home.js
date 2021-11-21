// Components
import Mint from "./Mint/Mint";
import Info from "./Info/Info";

import Background from "./Background/Background";
import { Wrapper } from "../Widget";

const Home = () => {
  return (
    <Wrapper>
      <Mint />
      <Info />
      <Background />
    </Wrapper>
  );
};

export default Home;
