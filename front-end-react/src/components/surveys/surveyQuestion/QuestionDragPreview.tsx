import { type CSSProperties, FC } from "react";
import QuestionText from "./Question";
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
const QuestionDragPreview: FC<DragPreviewProps> = ({ text, customStyles }) => {
  return (
    <div style={{ ...styles, ...customStyles }}>
      <QuestionText questionText={text} />
    </div>
  );
};

export default QuestionDragPreview;
