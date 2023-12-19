import React, { useRef, type FC, useEffect, useState } from "react";
import {
  type DragSourceMonitor,
  useDrag,
  useDrop,
  type DropTargetMonitor,
} from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import styled from "styled-components";
import classNames from "classnames";
import type { ChoiceType } from "../surveyCreatorChoice/Choice";

// redux
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { surveyQuestionMoved } from "../../../../redux/slices/surveySlice";
// helper functions
import { closestSide as closest } from "../../../../utils/survey/surveyHelpers";

//components
import Question from "./Question";
import RenderQuestion from "./RenderQuestion";

//StyledComponents
import SurveyQuestionActionItems from "./SurveyQuestionActionItems";

//material UI
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

//constants
import { SURVEY_TOOLBOX, QUESTION } from "../../../../utils/survey/ItemTypes";

// =================Styled Components ======================================>

const StyledQuestionContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 32px 40px 64px;
  min-height: 3.2rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: all 200ms ease;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  &.isHovered {
    border: 1px solid #e7c239;
  }
  &.IsActive {
    border: 2px solid #e7c239;
  }
  &.dragging {
    background: rgba(255, 255, 255, 0.5);
  }

  &.bottom::after {
    content: "";
    display: block;
    clear: both;
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -10px;
    left: 0;
    background-color: #f3ac05;
  }

  &.top::before {
    content: "";
    display: block;
    clear: both;
    width: 100%;
    height: 2px;
    position: absolute;
    top: -10px;
    left: 0;
    background-color: #f3ac05;
  }

  &.right::after {
    content: "";
    position: absolute;
    top: 0;
    right: -10px;
    width: 2px;
    height: 100%;
    background-color: #f3ac05;
  }

  &.left::before {
    content: "";
    position: absolute;
    top: 0;
    left: -10px;
    width: 2px;
    height: 100%;
    background-color: #f3ac05;
  }

  &.noPseudoElement:before {
    content: "";
    display: none;
  }

  &.noPseudoElement:after {
    content: "";
    display: none;
  }

  div.drag-handle {
    position: absolute;
    height: 28px;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.5;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: move;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledQuestionTextContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 0.8rem 13px;

  span.contenteditable-container {
    flex-basis: auto;
    color: hsla(120, 60%, 1%, 0.85);
    font-weight: 500;
    word-wrap: break-word;
    line-height: 1.6;
    font-size: 17px;
    padding: 0;
    margin: 0;
  }
`;

// ===============Type Declarations==============================================>

export interface QuestionType {
  type: string;
  id: string;
  name: string;
  choices: ChoiceType[];
}

interface QuestionProp {
  question: any;
  questionPath: string;
  setParentActive: (isActive: boolean) => void;
  setParentHover: (isHovered: boolean) => void;
}
// ========================================================================>

const QuestionContainer: FC<QuestionProp> = ({
  question,
  questionPath,
  setParentActive,
  setParentHover,
}) => {
  const ref = useRef<HTMLDivElement | null>(null); // current question container ref
  const questionRef = useRef<HTMLDivElement | null>(null); //current question text ref.
  const [dropPosition, setDropPosition] = useState<string | null>(null);
  const [containerIsActive, setContainerIsActive] = useState(false);
  const [actionItemsVisibility, setActionItemsVisibility] = useState<
    "visible" | "hidden"
  >("hidden");

  const [containerIsHovered, setContainerIsHovered] = useState(false);

  // redux hooks
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: [SURVEY_TOOLBOX, QUESTION],
    drop: (item: any, monitor) => {
      // dropping a question item
      if (monitor.getItemType() === QUESTION) {
        return {
          dropTargetPath: questionPath,
          dragSourcePath: item.path,
          type: item.type,
          dropPosition,
        };
      }
      // dropping sidebar item.
      if (item.type === SURVEY_TOOLBOX) {
        return {
          questionType: item.name,
          type: SURVEY_TOOLBOX,
          path: questionPath,
          dropPosition,
        };
      }
    },
    hover: (item: any, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }

      //question hover over questions
      if (monitor.getItemType() === QUESTION) {
        let closestSide;
        const dragItemPath = item.path;
        const currentQuestionPath = questionPath;

        //Question hover itself.
        if (dragItemPath === currentQuestionPath) {
          setContainerIsActive(false);
          setDropPosition(null);
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const mouseXY = monitor.getClientOffset();
        if (mouseXY) {
          closestSide = closest(mouseXY, hoverBoundingRect);
          if (closestSide) {
            setDropPosition(closestSide);
          }
          return;
        }
        return;
      }

      //sidebar items hover over questions
      if (monitor.getItemType() === SURVEY_TOOLBOX) {
        let closestSide;
        //get rectangular area of hovered question.
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // get mouse current mouse postion
        const mouseXY = monitor.getClientOffset();

        //get distance between mouse pointer and each side or the
        //hover question container.
        if (mouseXY) {
          closestSide = closest(mouseXY, hoverBoundingRect);
          if (closestSide) {
            setDropPosition(closestSide);
          }
        }
      }
      return;
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: QUESTION,
    item: {
      type: QUESTION,
      questionTextContainerOffsetHeight: questionRef.current?.offsetHeight,
      questionTextContainerOffsetWidth: questionRef.current?.offsetWidth,
      path: questionPath,
      questionText: question.name,
    },

    end: (item: any, monitor: DragSourceMonitor) => {
      const dropResult: any = monitor.getDropResult();
      if (dropResult) {
        const { dragSourcePath, dropTargetPath, dropPosition, type } =
          dropResult;

        dispatch(
          surveyQuestionMoved({
            dragSourcePath,
            dropTargetPath,
            dropPosition,
            type,
          })
        );
      }
    },

    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  // ========================Event Handlers=============================================>
  const handleMouseLeave = (e: React.MouseEvent) => {
    setContainerIsHovered(false);
    setParentHover(true);
    setActionItemsVisibility("hidden");
  };
  const handleMouseEnter = (e: React.MouseEvent) => {
    setContainerIsHovered(true);
    setParentHover(false);
    setActionItemsVisibility("visible");
  };

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

  drop(ref);
  // ===============================Main Return===================================>
  return (
    <StyledQuestionContainer
      tabIndex={-1}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={classNames({
        isHovered: containerIsHovered,
        IsActive: containerIsActive,
        dragging: isDragging,
        top: dropPosition === "top",
        right: dropPosition === "right",
        bottom: dropPosition === "bottom",
        left: dropPosition === "left",
        noPseudoElement: !isOver,
      })}
      key={question.id}
      ref={ref}
    >
      <div
        ref={drag}
        className="drag-handle"
        style={{
          visibility:
            containerIsHovered || containerIsActive ? "visible" : "hidden",
        }}
      >
        <DragIndicatorIcon sx={{ transform: "rotate(90deg)" }} color="action" />
      </div>
      <StyledQuestionTextContainer>
        <Question
          ref={questionRef}
          questionPath={questionPath}
          questionText={question.name}
        />
      </StyledQuestionTextContainer>
      <RenderQuestion question={question} questionPath={questionPath} />
      {/*Render question based on type*/}
      <SurveyQuestionActionItems
        questionPath={questionPath}
        itemVisibility={
          containerIsActive || containerIsHovered ? "visible" : "hidden"
        }
      />
    </StyledQuestionContainer>
  );
};

export default QuestionContainer;
