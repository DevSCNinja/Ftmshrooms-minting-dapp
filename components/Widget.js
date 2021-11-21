import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: #4831d4;
    min-height: 100vh;
    font-family: "Roboto Slab", serif;
    position: relative;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    background-color: #0000008f;
    position: relative;
    z-index: 3;
    img {
        margin-top: 17px;
        @media (max-width: 998px) {
            height: 54px;
        }
    }
    
`;

export const LogoButton = styled.button`
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
`;


export const MainContent = styled.div`
    display: flex;
    justify-content: center;
    justify-content: space-between;
    @media (max-width: 998px) {
        flex-direction: column;
        justify-content: center;
    }
`;

export const PreviewImageContent = styled.div`
    width: 240px;
    display: flex;
    align-item: center;
    justify-content: center;
    position: relative;
    z-index: 3;
    @media (max-width: 998px) {
      width: 120px;
    }
`;
export const PreviewImage = styled.div`
    width: 40%;
    margin-top: 70px;
    position: relative;
    img {
        width: 100%;
        border-radius: 30px 0 30px 0;
        z-index: 2;
        position: relative;
    }
    @media (max-width: 998px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 40px;
        justify-content: center;
        display: flex;
    }
`;

export const InfoContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    @media (max-width: 998px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`;

export const Div = styled.div`
    display: block
`;

export const Img = styled.img`
    display: block
`;

export const PriceBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    div {
        :first-child {
            text-align: left
        }
        :last-child {
            text-align: right
        }
    }
`;

export const MintForm = styled.div`
    max-width: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 150px;
    position: relative;
    z-index: 3;
    @media (max-width: 998px) {
      margin-top: 30px;
    }
`;