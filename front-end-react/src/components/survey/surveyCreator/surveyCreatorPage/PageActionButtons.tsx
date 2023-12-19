import { type FC } from "react";
import styled from "styled-components";

//redux
import { surveyItemDeleted } from "../../../../redux/slices/surveySlice";
import { useAppDispatch } from "../../../../hooks/reduxHooks";

//components
import SurveyActionButton from "../SurveyCreatorActionButton";

// material ui components.
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
// ===================================================================>
export const StyleActionPageActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1rem;
  right: 2rem;
 
  }
`;
// ===================================================================>

interface PageActionButtonsProp extends React.ComponentPropsWithRef<"div"> {
  pagePath: string;
}
// ===================================================================>
const PageActionButtons: FC<PageActionButtonsProp> = ({ pagePath }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    dispatch(surveyItemDeleted({ path: pagePath }));
  };

  const handleDuplicate = (e: React.MouseEvent) => {};
  return (
    <StyleActionPageActionButtonsContainer tabIndex={0}>
      <SurveyActionButton
        onClick={handleDuplicate}
        buttonIcon={<ContentCopyIcon fontSize="small" />}
        buttonText="Duplicate"
      />
      <SurveyActionButton
        onClick={handleDelete}
        buttonIcon={<DeleteIcon fontSize="small" />}
        buttonText="Delete"
      />
    </StyleActionPageActionButtonsContainer>
  );
};

export default PageActionButtons;
