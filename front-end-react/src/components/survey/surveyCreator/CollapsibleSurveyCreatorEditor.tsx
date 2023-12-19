import type { FC } from "react";
import styled from "styled-components";

// ==================================================================>

export const StyledResponsiveRightSidebarContainer = styled.div`
  width: 400px;
  height: 100%;
  min-width: 360px;
  border-left: 1px solid #d6d6d6;
  display: none;
  /* media queries */
  @media only screen and (width >= 1200px) {
    display: block;
  }
`;
// ==================================================================>
interface ResponsiveRightSideBarProp {}

// ==================================================================>

const ResponsiveRightSidebar: FC = () => {
  return (
    <StyledResponsiveRightSidebarContainer></StyledResponsiveRightSidebarContainer>
  );
};

export default ResponsiveRightSidebar;
