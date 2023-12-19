import { FC } from "react";

//components
import { StyledSwipeableSidebarContentContainer } from "../SwipeableSidebarContent";
import AccountDropDownMenu from "./AccountDropDownMenu";
//material ui
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// =====================type declarations =================>
interface SwipeableSidebarProps {
  closeSwipeableListItem: (isOpen: boolean) => void;
}

// ========================================================>

const AccountSwipeableContent: FC<SwipeableSidebarProps> = ({
  closeSwipeableListItem,
}) => {
  return (
    <StyledSwipeableSidebarContentContainer>
      <div className="swipeable-cancel-button">
        <span
          onClick={() => {
            closeSwipeableListItem(false);
          }}
        >
          <CloseOutlinedIcon fontSize="large" />
        </span>
      </div>
      <AccountDropDownMenu />
    </StyledSwipeableSidebarContentContainer>
  );
};

export default AccountSwipeableContent;
