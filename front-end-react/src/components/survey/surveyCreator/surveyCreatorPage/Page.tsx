import React, { useState, type FC } from "react";
import styled from "styled-components";
import { Fragment } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

//survey-creator text-editor
import TryTextEditor from "../surveyCreatorTextEditor/TryTextEditor";
//components
import AddQuestion from "./AddQuestion";
import PageActionButtons from "./PageActionButtons";
import QuestionContainer from "../surveyCreatorQuestion/QuestionContainer";

//constants
import { QUESTION, SURVEY_TOOLBOX } from "../../../../utils/survey/ItemTypes";

// ===============================================================>
// styled Components
export const StyledPageContainer = styled.div`
  padding: 2rem;
  display: flex;
  position: relative;
  flex-direction: column;
  transition: 100ms all;
  margin-bottom: 1rem;
  border-radius: 0.2rem;
  border: 2px solid transparent;

  &.active {
    background-color: rgba(209, 180, 19, 0.1);
    border: 2px solid #ffe013;
  }
  &.hovered {
    background-color: rgba(209, 180, 19, 0.1);
  }
  div.page-description {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.4rem;
    h3 {
      color: hsla(120, 60%, 1%, 0.55);
      font-size: 28px;
      font-weight: 700;
    }
  }
`;
// ======================Type Declarations=======================================>

export interface PageType {
  questions: any[];
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
  const [isActive, setContainerIsActive] = useState(false);
  const [containerIsHovered, setContainerIsHovered] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: [QUESTION, SURVEY_TOOLBOX],

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: (item, monitor) => {
      // Sidebar items can be dropped on pages.
      if (monitor.getItem() == SURVEY_TOOLBOX) {
        return true;
      }
      return true;
    },
  });

  // ========================Event Handlers=======================>

  const handleFocus = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // Not triggered when swapping focus between children
      setContainerIsActive(true);
    }
    if (e.currentTarget === e.target) {
      //focused self
      setContainerIsActive(true);
    }
  };
  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // Not triggered when swapping focus between children
      setContainerIsActive(false);
    }
    if (e.currentTarget === e.target) {
      //unfocused self
    } else {
      //focus left self
      setContainerIsActive(false);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setContainerIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setContainerIsHovered(false);
  };
  // ===========================================================>

  return (
    <StyledPageContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={-1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={classNames({ active: isActive, hovered: containerIsHovered })}
      key={page.id}
      ref={drop}
    >
      <div className="page-description">
        <h3>{page.name}</h3>
        <TryTextEditor />
      </div>
      {page.questions.map((question, index) => {
        const questionPath = `${path}-${index}`;

        return (
          <Fragment key={question.id}>
            <QuestionContainer
              setParentHover={setContainerIsHovered}
              setParentActive={setContainerIsActive}
              questionPath={questionPath}
              question={question}
            />
          </Fragment>
        );
      })}

      <AddQuestion
        setParentActive={setContainerIsActive}
        setParentHover={setContainerIsHovered}
      />

      {isActive && <PageActionButtons pagePath={path} />}
    </StyledPageContainer>
  );
};

// ============================================================>
export default Page;
