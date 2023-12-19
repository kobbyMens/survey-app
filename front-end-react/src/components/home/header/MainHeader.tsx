import { FC, useRef, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

// redux
import { useAppSelector } from "../../../hooks/reduxHooks";

//components
import SwipeableSidebarContent from "./SwipeableSidebarContent";
import Account from "./account/Account";
import TopMenuDropDownContainer from "./customComponents/TopMenuDropDownContainer";
import StayUpdatedDropDownMenu from "./updates/StayUpdatedDropDownMenu";

//material ui.
import { Link } from "react-router-dom";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import DemoDropDownMenu from "./demo/DemoDropDownMenu";
import LoginIcon from "@mui/icons-material/Login";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";

// ====================Styled Components======================>
const StyledMainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.fixedHeader {
    padding: calc(0 * 8px) calc(2 * 8px) calc(0 * 8px) calc(2 * 8px);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 4px -4px;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    position: fixed;
    div.logo-wrapper {
      a.logo-link {
        margin: calc(1 * 8px) calc(1 * 8px);
        span {
          font-size: 16px;
        }
      }
    }
  }

  div.logo-wrapper {
    a.logo-link {
      margin: calc(2 * 8px) calc(0 * 8px);
      display: flex;
      padding: calc(1 * 8px) calc(2.5 * 8px);
      background-color: var(--green-background);
      align-items: center;

      span {
        display: flex;
        align-items: center;
        font-size: 32px;
        color: #fff;
        font-style: italic;
      }
    }
  }

  nav.top-nav-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    ul {
      display: flex;
      align-items: center;
      gap: calc(1 * 8px);

      li.top-menu-item {
        color: var(--black-font-color, #181818);
        opacity: 0.9;
        font-weight: 500;
        font-size: 14px;
        align-items: center;
        display: flex;
        position: relative;
        padding: calc(1 * 8px) calc(2 * 8px);
        cursor: pointer;
        gap: calc(0.1 * 8px);

        a.top-menu-item-link {
          display: flex;
          gap: calc(1 * 8px);
          align-items: center;
          span {
            display: flex;
          }
        }
      }

      li.top-menu-item.link.underline-hover {
        padding: 0;
        display: flex;
        a {
          padding: calc(1 * 8px) calc(2 * 8px);
          font-weight: 500;
          span.top-menu-icon {
            color: var(--primary-yellow);
            font-size: 18px;
          }
        }

        &:hover::after {
          opacity: 1;
        }
      }

      li.top-menu-item.menu.underline-hover {
        display: none;

        &:hover::after {
          opacity: 1;
        }
      }

      li.top-menu-item.design-survey {
        padding: 0 calc(2 * 8px);
        a {
          border-radius: 5px;
          display: flex;
          justify-content: center;
          padding: calc(1 * 8px) calc(2 * 8px) calc(1 * 8px) calc(2 * 8px);
          background-color: rgb(249, 190, 0);

          &:hover {
            box-shadow: 0px 4px 24px rgb(249, 190, 0, 0.3);
          }

          span {
            font-weight: 800;
            font-size: 16px;
          }
        }
      }

      li.top-menu-item.underline-hover::after {
        content: "";
        position: absolute;
        width: 100%;
        height: calc(0.4 * 8px);
        left: 0;
        bottom: 0;
        background-color: var(--primary-yellow);
        opacity: 0;
      }
    }
    div.top-menu-separator {
      padding: calc(0 * 8px) calc(2 * 8px);
      div {
        width: 1px;
        height: calc(4 * 8px);
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  /** -------------Start Media queries----------------------- **/

  @media only screen and (width > 1400px) {
    padding: calc(1.5 * 8px) calc(6 * 4px) calc(1.5 * 8px) calc(4 * 8px);

    nav.top-nav-container {
      ul {
        li.top-menu-item.link {
          a.top-menu-item-link {
            span.top-menu-text.donation {
              font-weight: 600;
            }
          }
        }
      }
    }
  }

  @media only screen and (1200px <= width <= 1400px) {
    padding: calc(1 * 8px) calc(6 * 4px);

    div.logo-wrapper {
      a.logo-link {
        margin: calc(2.5 * 8px) calc(0 * 8px);
      }
    }

    nav.top-nav-container {
      ul {
        gap: calc(0 * 8px);

        li.top-menu-item.link {
          a.top-menu-item-link {
            span.top-menu-text.donation {
              display: none;
            }
          }
        }
      }
    }
  }

  @media only screen and (904px <= width <= 1200px) {
    padding: calc(1 * 8px) calc(6 * 4px);
    box-shadow: none;
    div.logo-wrapper {
      a.logo-link {
        margin: calc(1.5 * 8px) calc(0 * 8px);
        padding: calc(1 * 8px) calc(2 * 8px);
        span {
          font-size: 22px;
        }
      }
    }
    nav.top-nav-container {
      ul {
        gap: calc(0 * 8px);
        li.top-menu-item {
          display: none;
          a {
            span.top-menu-text {
              font-weight: 400;
            }
          }
        }

        li.top-menu-item.menu.underline-hover {
          display: flex;
        }
      }
      div.top-menu-separator {
        display: none;
      }

      ul.hideable-top-menu {
        display: none;
      }
    }
  }

  @media only screen and (600px <= width <= 904px) {
    padding: calc(1 * 8px) calc(6 * 4px);
    box-shadow: none;

    div.logo-wrapper {
      a.logo-link {
        span {
          font-size: 16px;
        }
      }
    }

    nav.top-nav-container {
      ul {
        gap: calc(0 * 8px);
        li.top-menu-item {
          display: none;

          a {
            span.top-menu-text {
              font-weight: 400;
            }
          }
        }

        li.top-menu-item.menu.underline-hover {
          display: flex;
        }
      }
      div.top-menu-separator {
        display: none;
      }

      ul.hideable-top-menu {
        display: none;
      }
    }
  }

  @media only screen and (width < 600px) {
    padding: calc(0.5 * 8px) calc(2 * 4px) calc(1 * 8px) calc(3 * 8px);
    box-shadow: none;

    div.logo-wrapper {
      a.logo-link {
        padding: 4px;
        span {
          font-size: 16px;
        }
      }
    }
    nav.top-nav-container {
      ul {
        gap: calc(0.5 * 8px);

        li.top-menu-item {
          display: none;
          a {
            span.top-menu-text {
              display: none;
            }
          }
        }

        li.top-menu-item.link.underline-hover {
          display: flex;
          a {
            span.top-menu-icon {
              color: var(--black-font-color, #161616);
            }
          }
        }
      }

      div.top-menu-separator {
        display: none;
      }

      ul.hideable-top-menu {
        display: none;
      }
    }
  }
`;

// ===========================================================>
const MainHeader: FC = () => {
  const isUserAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [fixedHeader, setFixedHeader] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null!); // reference to header-container;

  // sidebar toggler
  const toggleDrawer =
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

      setIsOpenSidebar(open);
    };

  // onscroll event to add styles to header element on scroll.
  window.onscroll = () => {
    if (window.scrollY > headerRef.current?.offsetHeight) {
      setFixedHeader(true);
    }
    if (window.scrollY < headerRef.current?.offsetHeight) {
      setFixedHeader(false);
    }
  };
  return (
    <>
      <StyledMainHeader ref={headerRef} className={classNames({ fixedHeader })}>
        <div className={classNames("logo-wrapper", { fixedHeader })}>
          <Link className="logo-link" to="/">
            <span>
              Free<i>Survey</i>
            </span>
          </Link>
        </div>
        <nav className="top-nav-container">
          <ul className="hideable-top-menu">
            <li className="top-menu-item link underline-hover">
              <Link to="*">Features</Link>
            </li>

            <TopMenuDropDownContainer text="Demo">
              <DemoDropDownMenu />
            </TopMenuDropDownContainer>

            <TopMenuDropDownContainer text="Stay Updated">
              <StayUpdatedDropDownMenu />
            </TopMenuDropDownContainer>

            <li className="top-menu-item link underline-hover">
              <Link to="*">Motivation</Link>
            </li>
          </ul>

          <div className="top-menu-separator">
            <div></div>
          </div>

          <ul>
            {/* render component based on user authentication status. */}
            {isUserAuthenticated ? (
              <li className="top-menu-item link underline-hover">
                <Link className="top-menu-item-link" to={"/donation"}>
                  <span className="top-menu-icon donation">
                    <VolunteerActivismOutlinedIcon sx={{ fontSize: "22px" }} />
                  </span>
                  <span className="top-menu-text donation">Donate</span>
                </Link>
              </li>
            ) : (
              <li className="top-menu-item link underline-hover">
                <Link className="top-menu-item-link" to={"/login"}>
                  <span className="top-menu-icon">
                    <LoginIcon sx={{ fontSize: "18px" }} />
                  </span>
                  <span className="top-menu-text">Log in</span>
                </Link>
              </li>
            )}
            {/* ------------------------------ */}

            {/* render component based on user authentication status. */}
            {isUserAuthenticated ? (
              <Account />
            ) : (
              <li className="top-menu-item link underline-hover">
                <Link className="top-menu-item-link" to={"/sign-up"}>
                  <span className="top-menu-icon">
                    <i className="las la-user-plus"></i>
                  </span>
                  <span className="top-menu-text">Sign up</span>
                </Link>
              </li>
            )}
            {/* --------------------- */}

            {/* Render based on authentication status */}
            {isUserAuthenticated ? (
              <li className="top-menu-item design-survey">
                <Link className="top-menu-item-link" to={"/my-workspace"}>
                  <span>My Workspace</span>
                </Link>
              </li>
            ) : (
              <li className="top-menu-item design-survey">
                <Link className="top-menu-item-link" to={"/design-survey"}>
                  <span>Design Survey</span>
                </Link>
              </li>
            )}
            {/*--------------------------*/}

            <li className="top-menu-item menu link underline-hover ">
              <Link
                className="top-menu-item-link"
                to={""}
                onClick={toggleDrawer(true)}
              >
                <span className="top-menu-icon">
                  <MenuIcon sx={{ fontSize: "18px" }} />
                </span>
                <span className="top-menu-text">Menu</span>
              </Link>
            </li>
          </ul>
        </nav>
      </StyledMainHeader>
      <SwipeableDrawer
        open={isOpenSidebar}
        anchor="right"
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <SwipeableSidebarContent closeSwipeableListItem={setIsOpenSidebar} />
      </SwipeableDrawer>
    </>
  );
};

export default MainHeader;
