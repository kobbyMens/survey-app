import { type FC } from "react";
import styled from "styled-components";

//components
import SurveyDesignerTabMenuItem from "./SurveyCreatorTabMenuItem";

// =======================Styled Components==================>
const StyledSurveyDesignerTopBarContainer = styled.div`
  display: flex;
  background: #fff;
  box-shadow: inset 0px -1px 0px #d6d6d6;

  div.sd-tabbed-menu-container {
    display: flex;
    align-items: center;
    height: calc(7 * 8px);
  }
`;
// ==========================================================>
const SurveyDesignerTopBar: FC = () => {
  return (
    <>
      <StyledSurveyDesignerTopBarContainer>
        <div className="sd-tabbed-menu-container">
          <SurveyDesignerTabMenuItem tabText="Creator" />
          <SurveyDesignerTabMenuItem tabText="Preview" />
          <SurveyDesignerTabMenuItem tabText="Themes" />
          <SurveyDesignerTabMenuItem tabText="JSON Editor" />
        </div>
      </StyledSurveyDesignerTopBarContainer>
    </>
  );
};

export default SurveyDesignerTopBar;
