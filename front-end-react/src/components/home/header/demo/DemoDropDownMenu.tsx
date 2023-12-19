import { type FC } from "react";

// material ui
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import TryIcon from "@mui/icons-material/Try";

//components
import DropDownMenu from "../customComponents/DropDownMenu";
import CustomListItem from "../customComponents/CustomListItem";
import ItemListSeparator from "../customComponents/ItemListSeparator";

// ========================================================>
const DemoDropDownMenu: FC = () => {
  return (
    <DropDownMenu>
      <CustomListItem
        text="Dashboard"
        url="dashboard"
        iconBackgroundColor="rgba(129, 220, 230, 0.250)"
        iconColor="rgb(129, 220, 230)"
        icon={<DashboardCustomizeOutlinedIcon />}
      />
      <CustomListItem
        text="Survey Templates"
        iconBackgroundColor="rgba(18, 154, 109, 0.250)"
        iconColor="rgb(18, 154, 109)"
        icon={<CollectionsIcon />}
      />
      <CustomListItem
        text="Create Survey"
        url="design-survey"
        iconBackgroundColor="rgba(249, 190, 0, 0.250)"
        iconColor="rgb(249, 190, 0)"
        icon={<BuildOutlinedIcon />}
      />
      <ItemListSeparator orientation="horizontal" />

      <CustomListItem
        text="Try now"
        iconBackgroundColor="rgba(238, 55, 45, 0.250)"
        iconColor="rgb(238, 55, 45)"
        icon={<TryIcon />}
      />
    </DropDownMenu>
  );
};

export default DemoDropDownMenu;
