import { FC } from "react";
import styled from "styled-components";

// ===============Style Components====================================>
const SurveyCreatorJSONEditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SurveyCreatorJSONEditor: FC = () => {
  return (
    <SurveyCreatorJSONEditorContainer>
      <div>
        <h1>JSONEditor Page </h1>
      </div>
    </SurveyCreatorJSONEditorContainer>
  );
};

export default SurveyCreatorJSONEditor;
