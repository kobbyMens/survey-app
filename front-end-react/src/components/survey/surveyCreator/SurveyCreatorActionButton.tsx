import type { FC } from "react";
import React from "react";
import styled from "styled-components";

// material-ui components
import Tooltip from "@mui/material/Tooltip";

// ===============Styled Component==================>

const StyleActionButton = styled.button`
  position: relative;
  background-color: transparent;
  outline: none;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  -webkit-appearance: none;
  border-radius: 5px;

  span.survey-btn-icon {
    color: #e7c239;
  }
`;

// ====================Type Declarations================================>

interface SurveyActionButtonProps extends React.ComponentPropsWithRef<"a"> {
  buttonText: string;
  buttonIcon: React.JSX.Element;
  onClick: (e: React.MouseEvent) => void;
}

// ==============================================================>

const SurveyActionButton: FC<SurveyActionButtonProps> = ({
  buttonText,
  buttonIcon,
  onClick,
}) => {
  return (
    <Tooltip title={buttonText}>
      <StyleActionButton onClick={onClick} className="survey-action-btn">
        <span className="survey-btn-icon">{buttonIcon}</span>{" "}
        <span className="survey-btn-text">{buttonText}</span>
      </StyleActionButton>
    </Tooltip>
  );
};

export default SurveyActionButton;
