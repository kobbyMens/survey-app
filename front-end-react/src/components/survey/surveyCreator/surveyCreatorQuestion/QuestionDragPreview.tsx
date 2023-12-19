import { type CSSProperties, FC, useRef } from "react";
import { type XYCoord } from "react-dnd";

// redux

// ===================Render Helpers===============================>
const styles: CSSProperties = {
  background: "#fff",
  border: "1px solid #e7c239",
  height: "40px",
  display: "flex",
  borderRadius: "1.5rem",
  justifyContent: "center",
  alignItems: "center",
};

export const getStyles = (
  currentOffset: XYCoord | null,
  offSetWidth: number | undefined,
  offsetHeight: number | undefined
) => {
  if (!currentOffset || !offSetWidth || !offsetHeight) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  x -= offSetWidth / 2;
  y -= offsetHeight / 2;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    width: `${offSetWidth}px`,
    transform,
    WebkitTransform: transform,
  };
};

// ==================Type declarations=============================>
interface DragPreviewProps {
  currentDragItem: CurrentDragItemType;
  mouseDragPosition: XYCoord;
}

interface CurrentDragItemType {
  path?: string;
  questionText: string;
  questionTextContainerOffsetHeight: number;
  questionTextContainerOffsetWidth: number;
}
const QuestionDragPreview: FC<DragPreviewProps> = ({
  currentDragItem,
  mouseDragPosition,
}) => {
  const {
    questionTextContainerOffsetHeight,
    questionTextContainerOffsetWidth,
    questionText,
  } = currentDragItem;
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      style={{
        ...styles,
        ...getStyles(
          mouseDragPosition,
          questionTextContainerOffsetWidth,
          questionTextContainerOffsetHeight
        ),
      }}
    >
      {questionText.length > 30
        ? `${questionText.substring(0, 65)}...`
        : questionText}
    </div>
  );
};

export default QuestionDragPreview;
