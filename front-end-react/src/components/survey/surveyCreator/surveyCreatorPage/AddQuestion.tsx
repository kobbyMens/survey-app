import { type FC, useState } from "react";
import styled from "styled-components";

//material-ui
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import classNames from "classnames";

// ====================Styled Components================================>

export const StyleAddQuestionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 56px;
  line-height: 56px;
  padding: 1.5rem 0;
  align-items: center;
  border-radius: 0.2rem;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  cursor: pointer;

  &.hovered {
    background: #f5f5f5;
  }
  span:nth-child(1) {
    color: hsl(206, 98.5%, 29%);
    font-size: 18px;
    font-weight: 600;
  }
  span:nth-child(2) {
    position: absolute;
    right: 5px;
  }
  &.last-page {
    margin-bottom: 3rem;
  }
  &.last-page:hover {
    background-color: #f3f3f3;
  }

  &.dragoveremptypage::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f3ac05;
  }
`;

// =========================Type Declaration==========================>

interface AddQuestionProps {
  setParentActive: (isActive: boolean) => void;
  setParentHover: (isHovered: boolean) => void;
}

const AddQuestion: FC<AddQuestionProps> = ({
  setParentActive,
  setParentHover,
}) => {
  const [isActive, setContainerIsActive] = useState(false);
  const [containerIsHovered, setContainerIsHovered] = useState(false);

  // ======================Event handlers====================================>

  const handleFocus = (e: React.FocusEvent) => {
    if (e.currentTarget === e.target) {
      //focused self
      e.stopPropagation();
      setParentActive(false);
      setContainerIsActive(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setContainerIsActive(false);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setParentHover(false);
    setContainerIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setContainerIsHovered(false);
    setParentHover(true);
  };

  const handleAddQuestion = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <StyleAddQuestionContainer
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      tabIndex={-1}
      className={classNames({ hovered: containerIsHovered })}
    >
      <span>Add Question</span>
      <span>
        <Tooltip
          onClick={handleAddQuestion}
          onFocus={handleFocus}
          onBlur={handleBlur}
          title="Add Question"
        >
          <IconButton aria-label="add-question">
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </span>
    </StyleAddQuestionContainer>
  );
};

export default AddQuestion;
