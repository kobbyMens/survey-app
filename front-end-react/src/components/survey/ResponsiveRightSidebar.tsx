import type { FC } from "react";
import styled from "styled-components";

// ==================================================================>

export const StyledResponsiveRightSidebarContainer = styled.div`
  width: 400px;
  height: 100%;
  min-width: 360px;
  border-left: 1px solid #d6d6d6;
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
