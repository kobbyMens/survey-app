import { ReactNode, type FC } from "react";
import styled from "styled-components";

// material ui
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// =======================Type Declarations============>
interface TopMenuDropDownContainer {
  children: ReactNode;
  text: string;
}

// =======================Styled Components============>
const StyledDropDownMenuContainer = styled.li`
  position: relative;
  font-size: 14px;
  align-items: center;
  display: flex;
  position: relative;
  padding: calc(1 * 8px) calc(2 * 8px);
  cursor: pointer;
  gap: calc(0.1 * 8px);

  span.top-menu-item-content {
    display: flex;
    align-items: center;
    opacity: 0.9;
    font-weight: 500;
    color: var(--black-font-color, #181818);
  }
  nav.drop-down-nav {
    width: 0;
    height: 0;
    border-width: 0;
    opacity: 0;
    z-index: -1;
    min-width: calc(32 * 8px);
    overflow: hidden;
    display: block;
    position: absolute;
    left: calc(-1 * 8px);
    top: calc(100%);
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 calc(4 * 8px) calc(8 * 8px) rgba(0, 0, 0, 0.07);
    border-radius: 8px;
  }

  &:hover {
    nav.drop-down-nav {
      z-index: 1000;
      opacity: 1;
      width: initial;
      height: initial;
      border-width: 1px;
    }

    span.top-menu-item-content {
      span.text-container {
        color: var(--drop-down-top-menu-hover-color, #8a8a8a);
      }
    }
  }
`;

// =========================================================>

const TopMenuDropDownContainer: FC<TopMenuDropDownContainer> = ({
  children,
  text,
}) => {
  return (
    <StyledDropDownMenuContainer>
      <span className="top-menu-item-content">
        <span className="text-container">{text}</span>{" "}
        <span>
          <KeyboardArrowDownIcon
            sx={{ paddingTop: "5px", fontSize: "24px", opacity: 0.5 }}
          />
        </span>
      </span>
      <nav className="drop-down-nav">{children}</nav>
    </StyledDropDownMenuContainer>
  );
};

export default TopMenuDropDownContainer;
