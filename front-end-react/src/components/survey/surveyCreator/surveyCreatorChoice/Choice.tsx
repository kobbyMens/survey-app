import { useState, type FC } from "react";
import styled from "styled-components";

// material-ui
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDrag } from "react-dnd";

// redux
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { surveyItemDeleted } from "../../../../redux/slices/surveySlice";
// contants
import { CHOICE } from "../../../../utils/survey/ItemTypes";

// ========================Styled Components===========================>
export const StyledChoiceContainer = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  gap: 0.5rem;
  margin-left: -40px;
  div.icon-container {
    min-width: 72px;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
    margin: 0.5rem 0;
  }
  div.label-container {
    display: flex;
    padding: 0.5rem 0;
  }
  label {
    padding: 4px 0;
    gap: 0.5rem;
    display: inline-flex;
    position: relative;
    vertical-align: top;
  }
  span.remove-icon {
    padding: 6px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
  }
  span.remove-icon:hover {
    background-color: rgba(230, 10, 62, 0.1);
    border-radius: 50%;
  }
  span.drag-icon {
    cursor: move;
    padding: 4px 2px;
    display: flex;
  }
  span.text-container {
    display: flex;
    font-size: 17px;
    align-items: center;
    color: hsla(0, 0%, 0%, 0.845);
  }
  span.pseudo-input {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
    height: 22px;
    width: 22px;
    border: none;
  }
  input {
    position: absolute;
    display: inline;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }
`;

// =========================Typed Declarations=========================>

export interface ChoiceType {
  id: string;
  content: string;
}

export interface ChoiceProps {
  id: string;
  content: string;
  path: string;
}

// ======================================================================>
const Choice: FC<ChoiceProps> = ({ id, content, path }) => {
  const [isHidden, setIsHidden] = useState(true);
  const dispatch = useAppDispatch();

  const [, drag, preview] = useDrag(
    () => ({
      type: CHOICE,
      item: { id, content, path },
    }),
    [CHOICE, id]
  );
  //======================Event handlers==================================>
  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHidden(true);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHidden(false);
  };

  const handleRemoveChoice = () => {
    dispatch(surveyItemDeleted({ path: path }));
  };
  return (
    <StyledChoiceContainer
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      ref={preview}
    >
      <div className="icon-container">
        <span
          className="drag-icon"
          style={{ visibility: isHidden ? "hidden" : "visible" }}
          ref={drag}
        >
          <DragIndicatorIcon sx={{ color: "hsla(0, 0%, 77%, 0.918);" }} />
        </span>
        <span onClick={handleRemoveChoice} className="remove-icon">
          <RemoveCircleOutlineIcon
            sx={{ color: "#d90707", fontSize: "18px" }}
          />
        </span>
      </div>
      <div className="label-container">
        <label>
          <input type="radio" name="item1" disabled />
          <span className="pseudo-input"></span>
          <span className="text-container">{content}</span>
        </label>
      </div>
    </StyledChoiceContainer>
  );
};

export default Choice;
