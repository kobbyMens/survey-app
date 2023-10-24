import styled from "styled-components";
import { type FC } from "react";
//redux
import { useSelector } from "react-redux";
import { pagesSelector } from "../../redux/slices/surveySlice";

// drag N Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

// styled components

import SidebarToolboxContainer from "./surveySidebar/SidedarContainer";
import ResponsiveRightSidebar from "./ResponsiveRightSidebar";
// component

import Pages from "./surveyPage/Pages";
import CustomDragLayer from "./CustomDragLayer";

// ================================================================>
const StyledSurveyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const StyledMainSurveyDropArea = styled.div`
  flex: 1 1 auto;
  flex-direction: column;
  display: flex;
  background: #f3f3f3;
  padding: 0 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-y: scroll;
`;

const StyledSurveyPagesContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 42rem;
`;

// =====================================================================>

const options = {
  touchSlop: 50,
  enableMouseEvent: true,
  ignoreContextMenu: false,
};

const isTouchDevice = "ontouchstart" in window;

const MySurveys: FC = () => {
  const pages = useSelector(pagesSelector);

  const handleDrop = (item: any, monitor: any) => {
    console.log(item);
  };
  return (
    <>
      <DndProvider
        backend={isTouchDevice ? TouchBackend : HTML5Backend}
        options={options}
      >
        <StyledSurveyContainer>
          <SidebarToolboxContainer />
          <StyledMainSurveyDropArea>
            <StyledSurveyPagesContainer>
              <Pages pages={pages} handleDrop={handleDrop} />
            </StyledSurveyPagesContainer>
          </StyledMainSurveyDropArea>
          <ResponsiveRightSidebar />
          <CustomDragLayer />
        </StyledSurveyContainer>
      </DndProvider>
    </>
  );
};

// =============================================================
export default MySurveys;
