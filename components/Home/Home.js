// Styled Components
import styled from "styled-components";

// Components
import Nav from "./Nav/Nav";
import Mint from "./Mint/Mint";
import Info from "./Info/Info";

import Background from "./Background/Background";

const Home = () => {
  return (
    <Wrapper>
      {/* <Nav /> */}
      <Mint />
      <Info />
      <Background />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  background-color: #4831d4;
  min-height: 100vh;

  font-family: "Roboto Slab", serif;

  position: relative;
`;
