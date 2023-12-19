import { FreeSurveyColors } from "../../utils/freeSurveyColors";

//material ui
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

// =============================================================>

const CustomCheckBox = styled(Checkbox)<CheckboxProps>(({}) => ({
  "&.MuiCheckbox-root.Mui-checked": {
    color: FreeSurveyColors.greenBackgroundColor,
  },
}));

export default CustomCheckBox;
