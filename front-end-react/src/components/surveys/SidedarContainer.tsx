import type { FC } from "react";
import SideBarItem from "./SideBarItem";
import styled from "styled-components";
import { QUESTIONS_DATA } from "../../utils/survey/surveyToolBoxData";

const StyledQuestionTypeContainer = styled.aside`
  flex-basis: 25%;
  background-color: #f3f3f3;
  height: 100vh;

  li {
    width: 100%;
    padding: 1rem 1rem;
    font-weight: 500;
    font-size: 1.1rem;
    border-bottom: 1px solid #fff;
    &:hover {
      cursor: pointer;
      background-color: #dddddd;
    }
  }
`;

const SidebarToolboxContainer: FC = () => {
  return (
    <>
      <StyledQuestionTypeContainer>
        <ul>
          {QUESTIONS_DATA.map((data) => (
            <li key={data.id}>
              <SideBarItem data={data} />
            </li>
          ))}
        </ul>
      </StyledQuestionTypeContainer>
    </>
  );
};

export default SidebarToolboxContainer;
