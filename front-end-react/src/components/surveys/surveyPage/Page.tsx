import { type FC } from "react";
import styled from "styled-components";

//material ui
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
//components
import Question from "../surveyQuestion/QuestionContainer";

// ===========================================================

interface PageType {
  elements: any[];
  name: string;
  id: string;
  title?: string;
}
interface PageCompnentPropType {
  page: PageType;
}

// ===========================================================
const StyledPageContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: 100ms all;
  border-radius: 0.5rem;

  &.active {
    background-color: red;
  }
  &:hover {
    background: rgba(209, 180, 19, 0.1);
  }
  h2 {
    margin-bottom: 1rem;
    font-size: 30px;
    font-weight: 700;
  }
  div.add-question {
    position: relative;
    display: flex;
    justify-content: center;
    height: 40px;
    align-items: center;
    border-radius: 0.5rem;
    background: #fff;
    cursor: pointer;
    &:hover {
      background: #f5f5f5;
    }
    span:nth-child(1) {
      color: #13c1f7;
      font-weight: 500;
    }
    span:nth-child(2) {
      position: absolute;
      right: 5px;
    }
  }
`;

// =========================================================
const Page: FC<PageCompnentPropType> = ({ page }) => {
  return (
    <StyledPageContainer key={page.id}>
      <h2>{page.name}</h2>

      {page.elements.map((element) => (
        <Question key={element.id} question={element} />
      ))}
      <div className="add-question">
        <span>Add Question</span>
        <span>
          <Tooltip title="Add Question">
            <IconButton aria-label="add-question">
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        </span>
      </div>
    </StyledPageContainer>
  );
};

// ============================================================
export default Page;
