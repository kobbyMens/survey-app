import { FC, useState } from "react";
import styled from "styled-components";

//components
import AccountDropDownMenu from "./AccountDropDownMenu";
import AccountSwipeableContent from "./AccountSwipeableContent";

//material ui
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// =====================type declaration=============>
interface AccountProps {}

// =====================Styled Components============>
const StyledAccountContainter = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  &.underline-hover::after {
    content: "";
    position: absolute;
    width: 100%;
    height: calc(0.4 * 8px);
    left: 0;
    bottom: 0;
    background-color: var(--primary-yellow);
    opacity: 0;
  }

  span.account-container {
    color: var(--black-font-color, #181818);
    opacity: 0.9;
    font-weight: 500;
    font-size: 14px;
    align-items: center;
    display: flex;
    position: relative;
    padding: calc(1 * 8px) calc(2 * 8px);
    cursor: pointer;
    gap: calc(0.3 * 4px);

    span.account-icon {
      display: flex;
      color: var(--primary-yellow);
      font-size: 24px;
    }
    span.account-text {
      font-weight: 600;
      display: flex;
    }
    span.arrow-icon {
      display: flex;
    }
  }

  &:hover {
    nav.account-drop-down-menu {
      z-index: 1000;
      opacity: 1;
      width: initial;
      height: initial;
      border-width: 1px;
    }
    span.account-container {
      span.account-icon {
        opacity: 0.7;
        color: var(--black-font-color, #181818);
      }
      span.account-text {
        opacity: 0.7;
      }
      span.arrow-icon {
        opacity: 0.7;
      }
    }
  }
  nav.account-drop-down-menu {
    width: 0;
    height: 0;
    border-width: 0;
    opacity: 0;
    z-index: -1;
    min-width: calc(22 * 8px);
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

  /** -------------Start Media queries----------------------- **/

  @media only screen and (1200px <= width <= 1400px) {
    span.account-container {
      span.account-text,
      span.arrow-icon {
        display: none;
      }
    }
  }

  @media only screen and (600px <= width < 1200px) {
    &:hover {
      &.underline-hover::after {
        opacity: 1;
      }
    }
    span.account-container {
      gap: calc(1 * 8px);

      span.arrow-icon {
        display: none;
      }

      span.account-text {
        font-weight: 400;
      }

      &:hover {
        span.account-icon {
          color: var(--primary-yellow);
          opacity: 1;
        }
        span.account-text {
          opacity: 1;
        }
      }
    }

    nav.account-drop-down-menu {
      display: none;
    }
  }

  @media only screen and (width < 600px) {
    &:hover {
      &.underline-hover::after {
        opacity: 1;
      }
    }
    span.account-container {
      span.account-text {
        display: none;
      }
      span.arrow-icon {
        display: none;
      }
      span.account-icon {
        color: #161616;
      }
      &:hover {
        opacity: 1;
        color: #161616;
      }
    }

    nav.account-drop-down-menu {
      display: none;
    }
  }
`;

const Account: FC<AccountProps> = () => {
  const [isOpenAccountSidebar, setIsOpenAccountSidebar] = useState(false);

  // sidebar toggler
  const accountToggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      event.preventDefault();
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (document.documentElement.clientWidth >= 1185) {
        return;
      }
      setIsOpenAccountSidebar(open);
    };

  return (
    <>
      <StyledAccountContainter
        className="underline-hover"
        onClick={accountToggleDrawer(true)}
      >
        <span className="account-container">
          <span className="account-icon">
            <PersonOutlineIcon sx={{ fontSize: "22px" }} />
          </span>
          <span className="account-text">Account</span>
          <span className="arrow-icon">
            <KeyboardArrowDownIcon
              sx={{ width: "initial", fontSize: "20px" }}
            />
          </span>
        </span>
        <nav className="account-drop-down-menu">
          <AccountDropDownMenu />
        </nav>
      </StyledAccountContainter>
      <SwipeableDrawer
        open={isOpenAccountSidebar}
        anchor="right"
        onClose={accountToggleDrawer(false)}
        onOpen={accountToggleDrawer(true)}
      >
        <AccountSwipeableContent
          closeSwipeableListItem={setIsOpenAccountSidebar}
        />
      </SwipeableDrawer>
    </>
  );
};

export default Account;
