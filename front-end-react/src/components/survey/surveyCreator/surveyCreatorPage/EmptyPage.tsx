import type { FC } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { type PageType } from "./Page";
import { useState } from "react";
// components
import { StyledPageContainer } from "./Page";
import { StyleAddQuestionContainer } from "./AddQuestion";
import PageActionButtons from "./PageActionButtons";
// material-ui
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// constants
import { SURVEY_TOOLBOX, QUESTION } from "../../../../utils/survey/ItemTypes";
import classNames from "classnames";

// ===================type declarations=============================>
interface EmptyPageProp {
  page: PageType;
  path: string;
  editable?: boolean;
}

// =================================================================>
const EmptyPage: FC<EmptyPageProp> = ({ page, path, editable }) => {
  const [isActive, setContainerIsActive] = useState(false);
  const [containerIsHovered, setContainerIsHovered] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [SURVEY_TOOLBOX, QUESTION],
    drop: (item: any) => ({ path, questionType: item.name }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const dragOver = isOver && canDrop;

  // ===================Event handlers==============================>

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
    <>
      {editable ? (
        <StyledPageContainer
          ref={drop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          tabIndex={-1}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classNames({
            active: isActive,
            hovered: containerIsHovered,
          })}
        >
          <div className="page-description">
            <h3>{page.name}</h3>
            <p>Description</p>
          </div>
          <StyleAddQuestionContainer
            className={classNames("last-page", {
              dragoveremptypage: dragOver,
            })}
          >
            <span>Add Question</span>
            <span>
              <Tooltip title="Add Question">
                <IconButton aria-label="add-question">
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </span>
          </StyleAddQuestionContainer>
          {isActive && <PageActionButtons pagePath={path} />}
        </StyledPageContainer>
      ) : (
        <StyledPageContainer ref={drop}>
          <div className="page-description">
            <h3>{page.name}</h3>
            <p>Description</p>
          </div>

          <StyleAddQuestionContainer
            className={classNames("last-page", {
              dragoveremptypage: dragOver,
            })}
          >
            <span>Add Question</span>
            <span>
              <Tooltip title="Add Question">
                <IconButton aria-label="add-question">
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </span>
          </StyleAddQuestionContainer>
        </StyledPageContainer>
      )}
    </>
  );
};

export default EmptyPage;
