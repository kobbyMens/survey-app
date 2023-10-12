import { type FC, CSSProperties } from "react";
import { ITEM_TYPES } from "../../utils/survey/ItemTypes";
import QuestionDragPreview from "./surveyQuestion/QuestionDragPreview";
import { type XYCoord, useDragLayer } from "react-dnd";

const layerStyles: CSSProperties = {
  display: "flex",
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
};

function getItemStyles(
  currentOffset: XYCoord | null,
  offsetWidth: number | null,
  offsetHeight: number | null
) {
  if (!currentOffset || !offsetWidth || !offsetHeight) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;
  x -= offsetWidth / 2;
  y -= offsetHeight;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebKitTransform: transform,
  };
}

const CustomDragLayer: FC = () => {
  const { item, itemType, isDragging, currentOffset } = useDragLayer(
    (monitor: any) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getClientOffset(),
    })
  );

  function renderItem() {
    switch (itemType) {
      case ITEM_TYPES.QUESTION:
        return (
          <QuestionDragPreview
            customStyles={getItemStyles(
              currentOffset,
              item.offsetWidth,
              item.offsetHeight
            )}
            text={item.name}
          />
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <>
      <div style={layerStyles}>{renderItem()}</div>
    </>
  );
};

export default CustomDragLayer;
