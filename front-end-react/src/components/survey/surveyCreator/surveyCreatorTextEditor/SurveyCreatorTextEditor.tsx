import { type FC, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

// ==================Styled Components=====================>
const StyledTextEditorContainer = styled.div`
  position: relative;
  align-items: center;
  padding: 0.4rem;
  display: flex;
  margin-top: 0.5rem;

  .content-editable {
    padding: 0.2rem;
    z-index: 10;
    outline: none;
  }
  .editor-placeholder {
    position: absolute;
    padding: 0.2rem;
    border-radius: 3px;
    &:hover {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    }
  }
`;

const SurveyCreatorTextEditor: FC = () => {
  const [content, setContent] = useState("");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);

  const handleContentChange = (e: any) => {
    const inputValue = e.target.innerText;
    setContent(inputValue);
    setPlaceholderVisible(inputValue === ""); // Show placeholder if content is empty
  };

  const handleFocus = () => {
    setPlaceholderVisible(false); // Hide placeholder when the div is focused
  };

  const handleBlur = () => {
    if (content === "") {
      setPlaceholderVisible(true); // Show placeholder if content is empty onBlur
    }
  };
  return (
    <div className="editable-div">
      {isPlaceholderVisible && (
        <div className="placeholder" onClick={handleFocus}>
          Type something...
        </div>
      )}
      <div
        contentEditable
        className="content"
        onInput={handleContentChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {content}
      </div>
    </div>
  );
};

export default SurveyCreatorTextEditor;
