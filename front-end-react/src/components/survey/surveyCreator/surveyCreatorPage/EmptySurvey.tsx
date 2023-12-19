import type { FC } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import styled from "styled-components";

//redux
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { sidebarItemAddedToEmptySurvey } from "../../../../redux/slices/surveySlice";
//constants
import { ITEM_TYPES } from "../../../../utils/survey/ItemTypes";

// =================Styled Components===============================>
const StyledEmptySurveyPage = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20rem;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: all 100ms;

  h3 {
    font-weight: 700;
  }
`;

// ===================================================================>
const EmptySurveyPage: FC = () => {
  const { SURVEY_TOOLBOX } = ITEM_TYPES;
  const dispatch = useAppDispatch();

  // ===============Drag N Drop=======================================>
  const [{ isActive }, drop] = useDrop({
    accept: SURVEY_TOOLBOX,
    drop: (item: any) => {
      //get question type from dropped item.
      const { name } = item;

      if (name) {
        dispatch(sidebarItemAddedToEmptySurvey(name));
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  });

  // =================Main Return======================================>
  return (
    <StyledEmptySurveyPage ref={drop}>
      <h3>
        {isActive
          ? "Release to Drop Here"
          : "Survey creator is empty. Drag an element from the sidebar and drop here."}
      </h3>
    </StyledEmptySurveyPage>
  );
};

export default EmptySurveyPage;
