import { useState, type FC } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { addSidebarItemToPage, pagesSelector } from "../../redux/slices/survey";

// drag N Drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// styled components
import SidebarToolboxContainer from "./SidedarContainer";
import SurveyContainer from "./SurveyContainer";

// component
import DropZone from "./DropZone";
import CustomDragLayer from "./CustomDragLayer";

// =============================================================

const MySurveys: FC = () => {
  const pages = useSelector(pagesSelector);

  const handleDrop = (item: any, monitor: any) => {
    console.log(item);
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <SurveyContainer>
          <SidebarToolboxContainer />
          <DropZone pages={pages} onDrop={handleDrop} />
          <CustomDragLayer />
        </SurveyContainer>
      </DndProvider>
    </>
  );
};

// =============================================================
export default MySurveys;
