import { FC } from "react";
import styled from "styled-components";

// redux
import { useSelector } from "react-redux";
import { pagesSelector } from "../../../redux/slices/surveySlice";
//components
import Pages from "./surveyCreatorPage/Pages";
import SidebarToolboxContainer from "./surveyCreatorSidebar/SidedarToolbox";
// ==============================Styled Components==================================>
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

const StyledSurveyDesignerContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 8 * 8px);
`;

const StyledSurveyPagesContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 44rem;
`;

const Creator: FC = () => {
  const pages = useSelector(pagesSelector);

  const handleDrop = (item: any, monitor: any) => {
    console.log(item);
  };
  return (
    <StyledSurveyDesignerContentContainer>
      <SidebarToolboxContainer />
      <StyledMainSurveyDropArea>
        <StyledSurveyPagesContainer>
          <Pages pages={pages} handleDrop={handleDrop} />
        </StyledSurveyPagesContainer>
      </StyledMainSurveyDropArea>
    </StyledSurveyDesignerContentContainer>
  );
};

export default Creator;
