//material ui
import { TextField, TextFieldProps } from "formik-mui";
import { styled } from "@mui/material/styles";

// =============================================================>

const CustomTextField = styled(TextField)<TextFieldProps>(({}) => ({
  "& .MuiFormLabel-root": {
    "&.Mui-focused": {
      color: "rgb(0, 0, 0, 0.7)",
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(0, 0, 0, 0.5)",
    },
  },
}));

export default CustomTextField;
