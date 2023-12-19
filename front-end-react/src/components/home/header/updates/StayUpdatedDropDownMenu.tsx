import { type FC } from "react";

// material ui
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

//components
import DropDownMenu from "../customComponents/DropDownMenu";
import CustomListItem from "../customComponents/CustomListItem";
import ItemListSeparator from "../customComponents/ItemListSeparator";

// ========================================================>
const StayUpdatedDropDownMenu: FC = () => {
  return (
    <DropDownMenu>
      <CustomListItem
        text="Dashboard"
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
        icon={<BuildOutlinedIcon />}
      />
      <CustomListItem
        text="Survey Templates"
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
        icon={<BuildOutlinedIcon />}
      />
      <CustomListItem
        text="Create Survey"
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
        icon={<BuildOutlinedIcon />}
      />
      <ItemListSeparator orientation="horizontal" />

      <CustomListItem
        text="Try now"
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
        icon={<BuildOutlinedIcon />}
      />
    </DropDownMenu>
  );
};

export default StayUpdatedDropDownMenu;
