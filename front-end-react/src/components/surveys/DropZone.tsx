import { type FC } from "react";
import styled from "styled-components";
import { SURVEY_TOOLBOX } from "../../utils/survey/ItemTypes";
import classNames from "classnames";

// Drag and Drop
import { useDrop } from "react-dnd";

//components
import Page from "./surveyPage/Page";
import PagesContainer from "./surveyPage/PagesContainer";

// =======================================================

interface DropZoneProps {
  onDrop: (item: any, monitor: any) => any;
  pages: any[];
}

// =======================================================
const StyledDropZoneContainer = styled.div`
  flex: 1 1 auto;
  flex-direction: column;
  display: flex;
  overflow-y: scroll;
  margin: 2rem;
  background: #f3f3f3;
  padding: 0 1.5rem;
  border: 1px solid #e7c239;
  align-items: center;
  justify-content: center;

  &.dropzone.active {
    background: #00aa96;
    transition: 100ms all;
  }
`;

// ========================================================

const DropZone: FC<DropZoneProps> = ({ pages, onDrop }) => {
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
    >
      {pages.length ? (
        <PagesContainer>
          {pages.map((page) => (
            <Page key={page.id} page={page} />
          ))}
        </PagesContainer>
      ) : (
        <h3>
          Survey creator is empty. Drag an element from the sidebar and drop
          here
        </h3>
      )}
    </StyledDropZoneContainer>
  );
};

export default DropZone;
