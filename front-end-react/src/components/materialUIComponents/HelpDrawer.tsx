import Box from "@mui/material/Box";
import { useState } from "react";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { Divider } from "@mui/material";

const HelpDrawer: React.FC = () => {
  const [IsOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };
  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ paddingTop: 0 }}>
        <ListItem sx={{ fontWeight: 800, fontSize: 18 }}>
          <h2>Support</h2>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ fontSize: 18 }}>
          <ListItemButton>
            <ListItemText secondary="How to subscripe to our premium version" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ fontSize: 18 }}>
          <ListItemButton>
            <ListItemText secondary="How to create a template with predefined questions" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Tooltip title="Help">
        <IconButton onClick={toggleDrawer(true)}>
          <HelpOutlinedIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </Tooltip>
      <Drawer anchor="right" open={IsOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default HelpDrawer;
