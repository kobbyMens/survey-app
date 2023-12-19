import { FreeSurveyColors } from "../../utils/freeSurveyColors";

//material ui
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// =============================================================>

const CustomFormActionButton = styled(Button)<ButtonProps>(({}) => ({
  backgroundColor: FreeSurveyColors.greenBackgroundColor,
  "&:hover": {
    backgroundColor: FreeSurveyColors.greenHoverBackgroundColor,
  },
}));

export default CustomFormActionButton;
