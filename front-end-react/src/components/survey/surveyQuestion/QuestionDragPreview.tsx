import { type CSSProperties, FC } from "react";
const styles: CSSProperties = {
  background: "#fff",
  border: "1px solid #e7c239",
  height: "40px",
  display: "flex",
  borderRadius: "1.5rem",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
};

interface DragPreviewProps {
  text: string;
  customStyles: CSSProperties;
}

interface QuestionPreviewProps {
  text: string;
}
export const QuestionPreview: FC<QuestionPreviewProps> = ({ text }) => {
  return <span>{text}</span>;
};
const QuestionDragPreview: FC<DragPreviewProps> = ({ text, customStyles }) => {
  return (
    <div style={{ ...styles, ...customStyles }}>
      <QuestionPreview text={text} />
    </div>
  );
};

export default QuestionDragPreview;
