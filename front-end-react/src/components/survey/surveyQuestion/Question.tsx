import { useState, useRef } from "react";
import { ReactNode, useCallback, forwardRef } from "react";

import { type Descendant, createEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { BaseEditor } from "slate";

//redux
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { surveyQuestionEdited } from "../../../redux/slices/surveySlice";

// helper functions
import { serialize } from "../../../utils/contentEditableHelpers";

// ============================================================================

export type CustomElement = { type: string; children: CustomText[] };
export type CustomText = { text: string };
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type Ref = HTMLSpanElement;

interface QuestionTextProp {
  questionText: string;
  questionPath: string;
}

interface DefaultElementProp {
  children: ReactNode;
  spanProps?: React.ComponentPropsWithRef<"span">;
}

// ============================================================================

const DefaultElement = forwardRef<Ref, DefaultElementProp>((props, ref) => {
  return (
    <span ref={ref} className="contenteditable-container" {...props.spanProps}>
      {props.children}
    </span>
  );
});

// ============================================================================

const QuestionText = forwardRef<Ref, QuestionTextProp>((props, ref) => {
  const [editor] = useState(() => withReact(createEditor()));
  const dispatch = useAppDispatch();
  const { questionText } = props;
  const { questionPath } = props;
  const splitQuestionPath = questionPath.split("-");
  const questionNumber = Number(splitQuestionPath[1]);
  const contentEditableTextRef = useRef("");

  const initialValue = [{ type: "span", children: [{ text: questionText }] }];

  //rendering function
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <></>;
      default:
        return <DefaultElement ref={ref} {...props} />;
    }
  }, []);

  //handle onblur event of the contentEditable text container.
  const handleContentEditableBlur = () => {
    if (contentEditableTextRef.current == "") {
      // insert question number into contentEditable if contentEditable is
      // empty
      contentEditableTextRef.current = `question ${questionNumber + 1}`;
      editor.insertText(contentEditableTextRef.current);
      dispatch(
        surveyQuestionEdited({
          questionPath,
          text: contentEditableTextRef.current,
        })
      );
    }
    dispatch(
      surveyQuestionEdited({
        questionPath,
        text: contentEditableTextRef.current,
      })
    );
  };

  const handleChangeOnSlate = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAstChange) {
      contentEditableTextRef.current = serialize(value);

      //localStorage.setItem("content", serialize(value));
    }
  };
  return (
    <Slate
      onChange={handleChangeOnSlate}
      editor={editor}
      initialValue={initialValue}
    >
      <Editable
        onBlur={handleContentEditableBlur}
        renderElement={renderElement}
      />
    </Slate>
  );
});

export default QuestionText;
