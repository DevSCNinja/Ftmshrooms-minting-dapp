// Styled Components
import styled from "styled-components";
import IconButton from '@mui/material/IconButton';
import { Container } from "@mui/material";

const Info = () => {
  return (
    <Container>
      <Wrapper>
        <p className="header">Lorem, ipsum.</p>

        <p className="info">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
          facere illo aliquid enim. Officiis, eum.
        </p>

        <div className="socials">
          <IconButton>
            <a
              href="https://twitter.com/FtmShrooms"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://spacecatsnft.io/socials/twitter.png"
                data-nsfw-filter-status=""
                alt=""
              />
            </a>
          </IconButton>

          <IconButton>
            <a href="http://discord.gg/KvvrWgAzD4" target="_blank" rel="noreferrer">
              <img
                src="./discord.svg"
                alt=""
                data-nsfw-filter-status=""
              />
            </a>
          </IconButton>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Info;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding-top: 100px;

  margin: 0 auto;

  z-index: 2;
  position: relative;

  //
  width: 800px;
  @media only screen and (max-width: 850px) {
    width: 100%;
  }
  //
  .header {
    font-size: 1.5rem;
    font-style: italic;
    color: #fff;
  }
  .info {
    color: #eee;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
  }

  .socials {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    a {
      background: #fff;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      padding: 5px;
      display: flex;
      align-items: center;
      img {
        width: 30px;
      }
    }
  }
  padding-bottom: 25px;
`;
