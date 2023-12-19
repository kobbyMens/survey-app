import { type FC } from "react";
import styled from "styled-components";

// components
import CustomSwipeableListItem from "./customComponents/CustomListItem";

//mui components
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

// =====================type declarations =================>
interface SwipeableSidebarProps {
  closeSwipeableListItem: (isOpen: boolean) => void;
}

// ====================Styled Components====================>
export const StyledSwipeableSidebarContentContainer = styled.nav`
  width: 350px;
  display: flex
  position: relative;
  flex-direction: column;
  padding: calc(4 * 8px) calc(2 * 8px) calc(8 * 8px);
  
  div.swipeable-cancel-button {
    display: flex;
    position: fixed;
    top: calc(1 * 8px);
    right: calc(2 * 8px);

    svg {
      opacity: 0.4;
      cursor: pointer;
    }
  }
`;

//Swipeable items data

const listItemData = [
  {
    Features: {
      color: "rgb(129, 220, 230)",
      backgroundColor: "rgba(129, 220, 230, 0.250)",
      icon: <GradeOutlinedIcon />,
    },
  },
  {
    "Create Survey": {
      color: "rgb(249, 190, 0)",
      backgroundColor: "rgba(249, 190, 0, 0.250)",
      icon: <BuildOutlinedIcon />,
    },
  },
];

const SwipeableSidebarContent: FC<SwipeableSidebarProps> = ({
  closeSwipeableListItem,
}) => {
  // ============================Event handlers======================>

  const handleCloseSwipeable = () => {
    closeSwipeableListItem(false);
  };

  return (
    <StyledSwipeableSidebarContentContainer role="presentation">
      <List>
        <div className="swipeable-cancel-button">
          <span onClick={handleCloseSwipeable}>
            <CloseOutlinedIcon fontSize="large" />
          </span>
        </div>
        {listItemData.map((listItem: any) => {
          const [key] = Object.keys(listItem);
          const { color, backgroundColor, icon } = listItem[key];
          return (
            <CustomSwipeableListItem
              key={key}
              text={`${key}`}
              iconColor={color}
              iconBackgroundColor={backgroundColor}
              icon={icon}
            />
          );
        })}
      </List>
      <Divider />
      <List></List>
    </StyledSwipeableSidebarContentContainer>
  );
};

export default SwipeableSidebarContent;
