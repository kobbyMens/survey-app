import { useState, type FC } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
// ====================== StyledComponents ========================>

const StyledSurveyCreatorTabMenuItemContainer = styled.span`
  div.sd-tabbed-menu-item {
    height: calc(7 * 8px);
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    word-wrap: nowrap;

    span {
      white-space: nowrap;
      font-weight: 400;
      font-size: 16px;
      color: #161616;
    }
    &:hover {
      background-color: #f3f3f3;
      box-shadow: inset 0px -1px 0px #d6d6d6;
    }
  }
  a.active {
    div.sd-tabbed-menu-item {
      background: #fff;
      box-shadow: inset 0px -2px 0px #19b394;
      &:hover {
        background-color: #fff;
        box-shadow: inset 0px -2px 0px #19b394;
      }
    }
  }
`;

// ======================= Typed Declaration ======================>

interface SurveyDesignerTabMenuItemProps {
  tabText: string;
}
// ================================================================>
const SurveyDesignerTabMenuItem: FC<SurveyDesignerTabMenuItemProps> = ({
  tabText,
}) => {
  // ======================Event handlers===============================>

  return (
    <StyledSurveyCreatorTabMenuItemContainer>
      <NavLink
        to={`/home/survey/${tabText.toLowerCase()}`}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "isPending" : ""
        }
      >
        <div className="sd-tabbed-menu-item">
          <span>{tabText}</span>
        </div>
      </NavLink>
    </StyledSurveyCreatorTabMenuItemContainer>
  );
};

export default SurveyDesignerTabMenuItem;
