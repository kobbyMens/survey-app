import styled from "styled-components";
import { type FC } from "react";

// drag N Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

// styled components

import ResponsiveRightSidebar from "./surveyCreator/CollapsibleSurveyCreatorEditor";
// component
import SurveyDesignerTopBar from "./surveyCreator/surveyCreatorTopBar/SurveyCreatorTopBar";

import CustomDragLayer from "./surveyCreator/CustomReactDnDLayer";
import { Outlet } from "react-router-dom";

// ================================================================>
const StyledSurveyDesigner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  /*media queries */
  @media only screen and (width => 1025px) {
  }
`;

export const StyledMainSurveyDropArea = styled.div`
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  background: #f3f3f3;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-y: scroll;
`;

// =====================================================================>

const options = {
  touchSlop: 50,
  enableMouseEvent: true,
  ignoreContextMenu: false,
};

const isTouchDevice = "ontouchstart" in window;

const SurveyCreator: FC = () => {
  return (
    <>
      <DndProvider
        backend={isTouchDevice ? TouchBackend : HTML5Backend}
        options={options}
      >
        <StyledSurveyDesigner>
          <SurveyDesignerTopBar />
          <Outlet />
          <CustomDragLayer />
        </StyledSurveyDesigner>
        <ResponsiveRightSidebar />
      </DndProvider>
    </>
  );
};

// =============================================================
export default SurveyCreator;
