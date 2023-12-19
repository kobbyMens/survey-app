import { type FC, CSSProperties } from "react";
import { useDragLayer } from "react-dnd";
import { ITEM_TYPES } from "../../../utils/survey/ItemTypes";

// components
import QuestionDragPreview from "./surveyCreatorQuestion/QuestionDragPreview";

// =====================================================================>
const layerStyles: CSSProperties = {
  display: "flex",
  position: "absolute",
  left: 0,
  top: 0,
  pointerEvents: "none",
  width: "100%",
  height: "100%",
};

// ===================================================================>
const CustomDragLayer: FC = () => {
  const { item, itemType, isDragging, currentOffset } = useDragLayer(
    (monitor: any) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getClientOffset(), //get last mousePosition while dragging.
    })
  );

  function renderItem() {
    switch (itemType) {
      case ITEM_TYPES.QUESTION:
        return (
          <QuestionDragPreview
            mouseDragPosition={currentOffset}
            currentDragItem={item}
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
