import { type FC } from "react";
import styled from "styled-components";
import { SURVEY_TOOLBOX } from "../../utils/survey/ItemTypes";
import classNames from "classnames";

// Drag and Drop
import { useDrop } from "react-dnd";

// =======================================================

interface DropZoneProps {
  onDrop: (item: any, monitor: any) => any;
}

// =======================================================
const StyledDropZoneContainer = styled.div`
  background: red;
  width: 100%;
  margin: 0.5rem 0;
  height: 5px;
  &.dropzone.active {
    background: #00aa96;
    transition: 100ms all;
  }
`;

// ========================================================

const DropZone: FC<DropZoneProps> = ({ onDrop }) => {
  // use this dummy data as initial layout

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: SURVEY_TOOLBOX,
    drop: (item: any, monitor) => {
      onDrop(item, monitor);
    },
    canDrop: (item: any, monitor) => {
      if (item.type === SURVEY_TOOLBOX) {
        return true;
      }
      return false;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;

  return (
    <StyledDropZoneContainer
      className={classNames("dropzone", { active: isActive })}
      ref={drop}
    ></StyledDropZoneContainer>
  );
};

export default DropZone;
