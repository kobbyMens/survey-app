import { useState, type FC } from "react";

// lexical composer
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EditorState } from "lexical";
import styled from "styled-components";
import classNames from "classnames";

function onError(error: any) {
  console.error(error);
}

// ====================Placeholder Component=====================>

const StyledPlacholderContainer = styled.span`
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  padding: 0.2rem;
  font-size: 17px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  &:hover {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

interface PlaceHolderComponentProps {
  children: React.ReactNode;
  onPlaceHolderFocus?: (editor: any) => void;
  className?: string;
}

const PlaceHolderComponent: FC<PlaceHolderComponentProps> = ({
  children,
  onPlaceHolderFocus,
  className,
}) => {
  const [editor] = useLexicalComposerContext();

  return (
    <StyledPlacholderContainer
      className={className}
      tabIndex={0}
      onFocus={() => {
        if (onPlaceHolderFocus) {
          onPlaceHolderFocus(editor);
        }
      }}
    >
      {" "}
      {children}
    </StyledPlacholderContainer>
  );
};

// =======================Main textEditor Component============>
const TextEditorContainer = styled.h5`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 0.5rem;
  .content-editable {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.2rem;
    outline: none;
    p {
      margin: 0;
      padding: 0.2rem;
      font-size: 17px;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.6);
    }
    &.focused {
      background-color: #fff;
      box-shadow: 0 0 0 2px #19b394;
    }
  }
  .placeholder.focused {
    background-color: #fff;
    box-shadow: 0 0 0 2px #19b394;
  }
`;

const TryTextEditor: FC = () => {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
  };

  // ====================Event handlers==============>

  const handleChange = (editorState: EditorState) => {};

  const [isFocused, setIsFocused] = useState(false);

  const handlePlaceHolderFocus = (editor: any) => {
    editor.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <TextEditorContainer>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={
            <ContentEditable
              onBlur={handleBlur}
              onFocus={() => setIsFocused(true)}
              className={classNames("content-editable", {
                focused: isFocused,
              })}
            />
          }
          placeholder={
            <PlaceHolderComponent
              className={classNames("placeholder", { focused: isFocused })}
              onPlaceHolderFocus={handlePlaceHolderFocus}
            >
              Description
            </PlaceHolderComponent>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleChange} />
        <HistoryPlugin />
      </LexicalComposer>
    </TextEditorContainer>
  );
};

export default TryTextEditor;
