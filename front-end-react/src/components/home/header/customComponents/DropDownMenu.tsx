import styled from "styled-components";
import { ReactNode, type FC } from "react";

//component

// ====================type declaration==============>
interface DropDownMenuProps {
  children: ReactNode;
}

// ====================Styled Components=============>
const StyledDropDownMenu = styled.ul`
  display: flex;
  flex-direction: column;
  padding: calc(2 * 8px);
`;

// =================================================>
const DropDownMenu: FC<DropDownMenuProps> = ({ children }) => {
  return <StyledDropDownMenu>{children}</StyledDropDownMenu>;
};

export default DropDownMenu;
