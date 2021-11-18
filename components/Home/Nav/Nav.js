// Styled Components
import styled from "styled-components";
const Nav = () => {
  return (
    <Wrapper>
      <a href="https://ftmshrooms.io/" target="_blank" rel="noreferrer">
        <img
          src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://ftmshrooms.io/wp-content/uploads/2021/10/cropped-fantomshrooms_logo_blue.png"
          alt=""
          className="logo"
          data-nsfw-filter-status=""
        />
      </a>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = styled.nav`
  padding: 0 20px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1000;

  .logo {
    padding-top: 10px;
    //
    width: 850px;
    @media only screen and (max-width: 850px) {
      width: 100%;
    }
    //
  }
`;
