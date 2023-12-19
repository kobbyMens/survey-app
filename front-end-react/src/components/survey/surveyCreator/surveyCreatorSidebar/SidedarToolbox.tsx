import type { FC } from "react";
import SideBarItem from "./SideBarItem";
import styled from "styled-components";
import { QUESTIONS_DATA } from "../../../../utils/survey/surveyToolBoxData";

const StyledSidebarToolbox = styled.aside`
  height: 100%;
  padding: 1rem;
  background-color: #f3f3f3;
  overflow-y: auto;

  div.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SidebarToolbox: FC = () => {
  return (
    <>
      <StyledSidebarToolbox>
        <div className="container">
          {QUESTIONS_DATA.map((data) => (
            <SideBarItem
              key={data.id}
              Icon={data.icon}
              data={data}
              showCopyIcon={true}
            />
          ))}
        </div>
      </StyledSidebarToolbox>
    </>
  );
};

export default SidebarToolbox;
