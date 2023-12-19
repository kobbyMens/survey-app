import { FC, ReactNode } from "react";
import { styled as styledComponent } from "styled-components";
import { FreeSurveyColors } from "../../utils/freeSurveyColors";

//material ui
import { Checkbox, CheckboxProps } from "formik-mui";
import { Field, ErrorMessage } from "formik";
import { styled } from "@mui/material/styles";

// ========================type declarations========================>
interface CustomCheckboxWithLabelProps {
  label: ReactNode;
  checkboxName: string;
}

// ========================Styled Component=========================>
const StyledCustomFormControl = styledComponent.div`
display: flex;
flex-direction: column;
label {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  position: relative;
  margin-left: -11px;
  
  span.text-container {
      p {
          color: rgb(107, 120, 127);
          font-size: 15px;
      }   
  }

}
p.error-message {
  padding: calc(0 * 8px) calc(4 * 8px);
  color: var(--error-color, #d32f2f);
  font-size: 0.8rem;
}
`;

const CustomCheckBox = styled(Checkbox)<CheckboxProps>(({}) => ({
  "&.MuiCheckbox-root.Mui-checked": {
    color: FreeSurveyColors.greenBackgroundColor,
  },
}));

const CustomCheckBoxWithLabel: FC<CustomCheckboxWithLabelProps> = ({
  label,
  checkboxName,
}) => {
  return (
    <StyledCustomFormControl>
      <label>
        <span className="checkbox-container">
          <Field
            component={CustomCheckBox}
            type="checkbox"
            name={checkboxName}
          />
        </span>
        <span className="text-container">{label}</span>
      </label>

      <p className="error-message">
        <ErrorMessage name={checkboxName} />
      </p>
    </StyledCustomFormControl>
  );
};

export default CustomCheckBoxWithLabel;
