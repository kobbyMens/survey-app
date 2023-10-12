import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useRef, type FC, useEffect } from "react";
import { type DragSourceMonitor, useDrag } from "react-dnd";

import styled from "styled-components";
import { ITEM_TYPES } from "../../../utils/survey/ItemTypes";
import classNames from "classnames";
import QuestionText from "./Question";
import { getEmptyImage } from "react-dnd-html5-backend";

const StyledQuestionContainer = styled.div`
  margin-bottom: 1rem;
  background: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid #e7c239;
  }
  &.dragging {
    background: rgba(255, 255, 255, 0.5);
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

interface QuestionType {
  type: string;
  id: string;
  name: string;
  choices: any[];
}

interface QuestionPropType {
  question: QuestionType;
}

const Question: FC<QuestionPropType> = ({ question }) => {
  const questionTextRef = useRef<HTMLSpanElement | null>(null);

  let questionTextContainerOffsetWidth = questionTextRef.current?.offsetWidth;
  let questionTextContainerOffsetHeight = questionTextRef.current?.offsetHeight;
  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPES.QUESTION,
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

  return (
    <StyledQuestionContainer
      className={classNames({ dragging: isDragging })}
      key={question.id}
    >
      <div className="drag-handle" ref={drag}>
        <DragIndicatorIcon color="action" />
      </div>

      <StyledQuestionTextContainer>
        <QuestionText ref={questionTextRef} questionText={question.name} />
      </StyledQuestionTextContainer>

      <form>
        {question.choices.map((choice: any) => (
          <label key={choice.id}>
            <input type="radio" name={question.name} value={choice.content} />
            {choice.content}
          </label>
        ))}
      </form>
    </StyledQuestionContainer>
  );
};

export default Question;
