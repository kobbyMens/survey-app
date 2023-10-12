import { type Descendant, createEditor } from "slate";
import { ReactNode, type FC, useCallback, useMemo, forwardRef } from "react";
import { BaseEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { useState } from "react";
import { serialize, getContent } from "../../../utils/contentEditableHelpers";
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
}
interface DefaultElementProp {
  children: ReactNode;
  spanProps?: React.ComponentPropsWithRef<"span">;
}

const DefaultElement = forwardRef<Ref, DefaultElementProp>((props, ref) => {
  return (
    <span ref={ref} className="contenteditable-container" {...props.spanProps}>
      {props.children}
    </span>
  );
});

const QuestionText = forwardRef<Ref, QuestionTextProp>((props, ref) => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = useMemo(
    () => getContent("content", "This is the default"),
    []
  );

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
    if (localStorage.getItem("content") == "") {
      editor.insertText(props.questionText);
    }
  };

  const handleChangeOnSlate = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAstChange) {
      localStorage.setItem("content", serialize(value));
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
