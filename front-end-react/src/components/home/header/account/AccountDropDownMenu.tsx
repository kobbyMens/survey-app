import { type FC } from "react";
import ItemListSeparator from "../customComponents/ItemListSeparator";

//redux
//redux
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { loggedOut } from "../../../../redux/slices/authSlice";

//components
import DropDownMenu from "../customComponents/DropDownMenu";
import CustomListItem from "../customComponents/CustomListItem";

const AccountDropDownMenu: FC = () => {
  const dispatch = useAppDispatch();

  //=======================Event handlers=============>
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(loggedOut());
  };

  return (
    <DropDownMenu>
      <CustomListItem
        text="Help Center"
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
      />
      <CustomListItem
        text="Settings"
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
      />

      <ItemListSeparator orientation="horizontal" />
      <CustomListItem
        text="Log Out"
        onClick={handleLogout}
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
      />
    </DropDownMenu>
  );
};

export default AccountDropDownMenu;
