// Styled Components
import styled from "styled-components";

const Intro = () => {
  return (
    <Wrapper>
      <div className="content">
        <p className="header">WHAT&apos;S CREATURETOADZ?</p>
        <p className="info">
          CreatureToadz is the first crossover project between two independently
          successful NFT communities, Creatures and CryptoToadz. The art was
          made from scratch to ensure *perfect* stylistic marriage between the
          two. No details were spared, I poured my soul into bringing these
          species together.
        </p>
      </div>
      <div className="images"></div>
    </Wrapper>
  );
};

export default Intro;

const Wrapper = styled.div``;
