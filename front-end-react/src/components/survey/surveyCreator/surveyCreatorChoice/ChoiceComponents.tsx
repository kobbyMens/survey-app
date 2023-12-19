import styled from "styled-components";
import { type FC } from "react";

//material-ui
import ControlPointIcon from "@mui/icons-material/ControlPoint";

//components
import { StyledChoiceContainer } from "./Choice";

//type declarations.
interface AddSurveyChoiceOptionsProps {
  name: string;
  onClick?: () => void;
}

// =====================Add item==================================>
const StyledAddChoiceContainer = styled(StyledChoiceContainer)`
  div.icon-container {
    span.add-icon {
      padding: 6px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 50%;
    }
    span.add-icon:hover {
      background-color: rgba(13, 176, 113, 0.2);
      border-radius: 50%;
    }
  }
  div.label-container {
    span.text-container {
      color: #909090;
    }
  }
`;

// ================================================================>
//Add choice component.
export const AddOptionsToSurveyChoice: FC<AddSurveyChoiceOptionsProps> = ({
  name,
  onClick,
}) => {
  return (
    <StyledAddChoiceContainer>
      <div className="icon-container">
        <span className="add-icon" onClick={onClick}>
          <ControlPointIcon sx={{ color: "#19b394", fontSize: "18px" }} />
        </span>
      </div>
      <div className="label-container">
        <label>
          <input type="radio" name="item1" disabled />
          <span className="pseudo-input"></span>
          <span className="text-container">{name}</span>
        </label>
      </div>
    </StyledAddChoiceContainer>
  );
};

// Select all choices component
