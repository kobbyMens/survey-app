import { useRef, type FC, useEffect, useState } from "react";
import { type DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import styled from "styled-components";
import classNames from "classnames";

// helper functions
import { closestSide as closest } from "../../../utils/survey/surveyHelpers";

//components
import Question from "./Question";

//StyledComponents
import SurveyQuestionActionItems from "./SurveyQuestionActionItems";
//material UI
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

//constants
import { SURVEY_TOOLBOX, QUESTION } from "../../../utils/survey/ItemTypes";

// ==============================================================

const StyledQuestionContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
  background: #fff;
  padding: 0.5rem;
  min-height: 3.2rem;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #ffdc40;
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
    display: flex;
    justify-content: center;
    cursor: move;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin: 0.7rem 0.5rem;
    }
  }
`;

export const StyledQuestionTextContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;

  span.contenteditable-container {
    flex-basis: auto;
    font-weight: 500;
    font-size: 18px;
    padding: 0;
    margin: 0;
  }
`;

// ==================================================================

export interface QuestionType {
  type: string;
  id: string;
  name: string;
  choices: any[];
}

interface QuestionProp {
  question: QuestionType;
  questionPath: string;
}
// ==================================================================

const QuestionContainer: FC<QuestionProp> = ({ question, questionPath }) => {
  const questionRef = useRef<HTMLSpanElement | null>(null);
  const [hoverPosition, setHoverPosition] = useState("");
  const [actionItemsVisibility, setActionItemsVisibility] = useState<
    "visible" | "hidden"
  >("hidden");
  const ref = useRef<HTMLDivElement | null>(null);

  let questionTextContainerOffsetWidth = questionRef.current?.offsetWidth;
  let questionTextContainerOffsetHeight = questionRef.current?.offsetHeight;

  const [{ isOver }, drop] = useDrop({
    accept: SURVEY_TOOLBOX,
    drop: (item: any) => ({
      questionType: item.components.type,
      type: SURVEY_TOOLBOX,
      questionPath,
      dropPosition: hoverPosition,
    }),
    hover: (item, monitor) => {
      let closestSide;
      if (!ref.current) {
        return;
      }
      //handle hover of sidebar items
      if (monitor.getItemType() === SURVEY_TOOLBOX) {
        //get rectangular area of hovered question.
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // get mouse current mouse postion
        const mouseXY = monitor.getClientOffset();

        //get distance between mouse pointer and each side or the
        //hover question container.
        if (mouseXY) {
          const distToTop = mouseXY.y - hoverBoundingRect.top;
          const distToBottom = hoverBoundingRect.bottom - mouseXY.y;
          const distToLeft = mouseXY.x - hoverBoundingRect.left;
          const distToRight = hoverBoundingRect.right - mouseXY.x;
          closestSide = closest(
            distToTop,
            distToBottom,
            distToLeft,
            distToRight
          );
          if (closestSide) {
            setHoverPosition(closestSide);
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
      id: question.id,
      name: question.name,
      offsetWidth: questionTextContainerOffsetWidth,
      offsetHeight: questionTextContainerOffsetHeight,
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  drop(ref);

  return (
    <StyledQuestionContainer
      tabIndex={0}
      onMouseLeave={() => {
        setActionItemsVisibility("hidden");
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setActionItemsVisibility("visible");
      }}
      className={classNames({
        dragging: isDragging,
        top: hoverPosition === "top",
        right: hoverPosition === "right",
        bottom: hoverPosition === "bottom",
        left: hoverPosition === "left",
        noPseudoElement: !isOver,
      })}
      key={question.id}
      ref={ref}
    >
      <div className="drag-handle" ref={drag}>
        <DragIndicatorIcon color="action" />
      </div>

      <StyledQuestionTextContainer>
        <Question
          ref={questionRef}
          questionPath={questionPath}
          questionText={question.name}
        />
      </StyledQuestionTextContainer>

      <form>
        {question.choices.map((choice: any) => (
          <label key={choice.id}>
            <input type="radio" name={question.name} value={choice.content} />
            {choice.content}
          </label>
        ))}
      </form>
      <SurveyQuestionActionItems
        questionPath={questionPath}
        itemVisibility={actionItemsVisibility}
      />
    </StyledQuestionContainer>
  );
};

export default QuestionContainer;
