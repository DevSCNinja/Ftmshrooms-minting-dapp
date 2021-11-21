import React from 'react';
import styled from 'styled-components';
import BounceLoader from "react-spinners/BounceLoader";

export default function Loading({ loading, ...props }) {
    return (
        <LoadingBox>
            <div className={loading ? "loading-content" : "loading-hidden"}>
                <Spinner>
                    <BounceLoader loading={true} color="red" size={60} />
                </Spinner>
            </div>
        </LoadingBox>
    )
}

const LoadingBox = styled.div`
    .loading-content {
        width: 100vw;
        height: 100vh;
        position: fixed;
        background: #040016;
        z-index: 100;
        top: 0;
        left: 0;
        opacity: 1;
        transition: opacity 0.4s
    }
    .loading-hidden {
        position: fixed;
        background: #040016;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.4s
    }    
`;

const Spinner = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;