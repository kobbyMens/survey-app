import React, { useState, type FC } from "react";
import styled from "styled-components";
import { Fragment } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

//material ui
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

//components
import PageActionButtons from "./PageActionButtons";
import QuestionContainer from "../surveyQuestion/QuestionContainer";
import { ITEM_TYPES } from "../../../utils/survey/ItemTypes";

// ===============================================================>
const StyledPageContainer = styled.div`
  padding: 2rem;
  display: flex;
  position: relative;
  flex-direction: column;
  transition: 100ms all;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;

  &.active {
    background-color: rgba(209, 180, 19, 0.1);
    border: 1px solid #e7c239;
  }
  &:hover {
    background-color: rgba(209, 180, 19, 0.1);
  }
  h2 {
    margin-bottom: 1rem;
    font-size: 30px;
    font-weight: 700;
  }
  div.add-question {
    margin-bottom: 3rem;
    position: relative;
    display: flex;
    justify-content: center;
    height: 40px;
    padding: 1.5rem 0;
    align-items: center;
    border-radius: 0.5rem;
    background: #fff;
    cursor: pointer;
    &:hover {
      background: #f5f5f5;
    }
    span:nth-child(1) {
      color: #13c1f7;
      font-weight: 500;
    }
    span:nth-child(2) {
      position: absolute;
      right: 5px;
    }
  }
`;
// ================================================================>
const { SURVEY_TOOLBOX, QUESTION } = ITEM_TYPES;
interface PageType {
  elements: any[];
  name: string;
  id: string;
  title?: string;
}
interface PageProp {
  page: PageType;
  path: string;
  handleDrop: (item: any, monitor: any) => void;
}

// =============================================================>

const Page: FC<PageProp> = ({ page, path, handleDrop }) => {
  const [isActive, setIsActive] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [QUESTION, SURVEY_TOOLBOX],

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item, monitor) => {
      // Sidebar items can be dropped on pages.
      if (monitor.getItem() == SURVEY_TOOLBOX) {
        return true;
      }
      return true;
    },
  });

  const handleFocus = (e: React.FocusEvent) => {
    setIsActive(true);
  };
  const handleBlur = (e: React.FocusEvent) => {
    // prevent bubbling of blur when childCompoenent is focus.
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsActive(false);
    }
  };

  return (
    <StyledPageContainer
      tabIndex={0}
      onFocus={handleFocus}
      className={classNames({ active: isActive })}
      onBlur={handleBlur}
      key={page.id}
      ref={drop}
    >
      <h2>{page.name}</h2>

      {page.elements.map((question, index) => {
        const questionPath = `${path}-${index}`;

        return (
          <Fragment key={question.id}>
            <QuestionContainer
              questionPath={questionPath}
              question={question}
            />
          </Fragment>
        );
      })}
      <div className="add-question">
        <span>Add Question</span>
        <span>
          <Tooltip title="Add Question">
            <IconButton aria-label="add-question">
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        </span>
      </div>

      {isActive && <PageActionButtons pagePath={path} />}
    </StyledPageContainer>
  );
};

// ============================================================>
export default Page;
