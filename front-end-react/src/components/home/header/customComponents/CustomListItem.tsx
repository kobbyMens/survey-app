import { type FC } from "react";

//mui components
import styled from "styled-components";
import { Link } from "react-router-dom";

// ================styled-components=================>
const StyledListItemContainer = styled.li`
  min-height: calc(5 * 8px);
  width: 100%;
  display: flex;
  border-radius: 8px;
  &:hover {
    background-color: var(--link-hover-bg-color, #f7f7f7);
  }
  a.drop-down-menu-link {
    flex-grow: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
    font-size: 14px;
    padding: calc(1 * 8px) calc(2 * 8px) calc(1 * 8px) calc(1 * 8px);
    line-height: 16px;
    gap: calc(2 * 8px);
    font-weight: 600;

    span.icon-container {
      display: flex;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(4 * 8px);
        width: calc(4 * 8px);
        border-radius: calc(4 * 8px);
        font-size: 14px;

        svg {
          font-size: 1.2rem;
        }
      }
    }

    span.list-item-text {
      display: flex;
      opacity: 0.9;
      color: var(--black-font-color, #181818);
    }
  }
`;

// ====================type declaration ===============>

interface SwipeableListItemProps {
  iconBackgroundColor?: string;
  iconColor?: string;
  icon?: React.ReactNode;
  text: string;
  url?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const CustomListItem: FC<SwipeableListItemProps> = ({
  iconBackgroundColor,
  iconColor,
  icon,
  text,
  url,
  onClick,
}) => {
  return (
    <StyledListItemContainer>
      <Link
        onClick={onClick}
        className="drop-down-menu-link"
        to={url ? url : "*"}
      >
        <span className="icon-container">
          {icon ? (
            <div
              style={{
                color: `${iconColor}`,
                backgroundColor: `${iconBackgroundColor}`,
              }}
            >
              {icon}
            </div>
          ) : null}
        </span>
        <span className="list-item-text">{text}</span>
      </Link>
    </StyledListItemContainer>
  );
};

export default CustomListItem;
