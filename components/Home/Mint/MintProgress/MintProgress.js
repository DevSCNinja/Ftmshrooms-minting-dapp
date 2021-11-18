// React
import { useEffect, useState } from "react";

// Styled Components
import styled from "styled-components";

// Material UI
import { styled as MuiStyle } from "@mui/material/styles";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import globalUseStyles from "../../../styleHook";

const BorderLinearProgress = MuiStyle(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#006b94" : "#006b94",
  },
}));

const MintProgress = (props) => {
  const globalClasses = globalUseStyles()
  return (
    <Wrapper>
      <BorderLinearProgress
        variant="determinate"
        value={(props.progress / 2500) * 100}
        className="progress"
      />
    </Wrapper>
  );
};

export default MintProgress;

const Wrapper = styled.div`
  height: min-content;
  width: 100%;

  // .progress {
  //   height: 20px;
  //   border-radius: 0px;
  //   border: 1px solid #fff;
  // }
`;
