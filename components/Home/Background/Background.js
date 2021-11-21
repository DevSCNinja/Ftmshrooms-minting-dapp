// Styled Components
import styled from "styled-components";

// Particles
import Particles from "react-particles-js";
import ParticleConfig from "./particle-config";

const Background = () => {
  return <Wrapper params={ParticleConfig} />;
};

export default Background;

const Wrapper = styled(Particles)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 1;
`;
