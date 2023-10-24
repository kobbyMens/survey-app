import type { FC } from "react";

//components
import SurveyActionButton from "../SurveyActionButton";
// redux
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { surveyItemDeleted } from "../../../redux/slices/surveySlice";

//material-ui components
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
//styled components
import styled from "styled-components";

// ===============================================================>

const StyledSurveyQuestionActionItemsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 0.5rem 0.2rem 0.5rem;
  width: 100%;
  margin-top: 0.5rem;

  button {
    position: relative;
    background-color: transparent;
    outline: none;
    border: 0;
    cursor: pointer;
    padding: 0.5rem;
    font-size: 15px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    -webkit-appearance: none;
    margin-right: 1.5rem;
  }

  button:hover {
    background-color: #f3f3f3;
    border-radius: 2px;
  }

  div.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;

    div.left-action-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div.right-action-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button {
      span.icon {
        color: #e7c239;
      }
    }
  }
`;

// ===============================================================>
interface SurveyQuestionActionItemsProp {
  itemVisibility?: "hidden" | "visible";
  questionPath: string;
}

// ===============================================================>

const SurveyQuestionActionItems: FC<SurveyQuestionActionItemsProp> = ({
  itemVisibility,
  questionPath,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(surveyItemDeleted({ path: questionPath }));
  };
  return (
    <StyledSurveyQuestionActionItemsContainer
      style={{ visibility: itemVisibility }}
    >
      <div className="action-buttons">
        <div className="left-action-buttons">
          <Tooltip title="Change question type">
            <button>
              <span>Change question type</span>{" "}
              <span className="icon">
                <ArrowDropDownIcon fontSize="small" />
              </span>
            </button>
          </Tooltip>
        </div>

        <div className="right-action-buttons">
          <SurveyActionButton
            buttonIcon={<ContentCopyIcon fontSize="small" />}
            buttonText={"Duplicate"}
          />

          <SurveyActionButton
            buttonIcon={<ChecklistIcon fontSize="small" />}
            buttonText="Required"
          />

          <SurveyActionButton
            onClick={handleDelete}
            buttonIcon={<DeleteIcon fontSize="small" />}
            buttonText="Delete"
          />
        </div>
      </div>
    </StyledSurveyQuestionActionItemsContainer>
  );
};

export default SurveyQuestionActionItems;
