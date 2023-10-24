import type { FC } from "react";
import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";

//redux
import { sidebarItemAddedToPage } from "../../../redux/slices/surveySlice";
import { useDispatch } from "react-redux";
// constants
import { SURVEY_TOOLBOX } from "../../../utils/survey/ItemTypes";
// ===================================================================

export interface SidebarDropResultType {
  type: string;
  questionType: string;
  questionPath: string;
  dropPosition: "left" | "right" | "top" | "bottom";
}
export interface SideBarComponentsType {
  type: string;
  content: string;
}

export interface QuestionTypeProps {
  id: string;
  type: string;
  components: SideBarComponentsType;
}
interface SidebarItemProps {
  data: QuestionTypeProps;
}

// ==================================================================

const SideBarItem: FC<SidebarItemProps> = ({ data }) => {
  const dispatch = useDispatch();

  const [{ opacity }, drag] = useDrag({
    type: SURVEY_TOOLBOX,
    item: data,
    end: (item, monitor: DragSourceMonitor) => {
      const dropResult: SidebarDropResultType | null = monitor.getDropResult();

      if (dropResult) {
        dispatch(sidebarItemAddedToPage(dropResult));
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  return (
    <>
      <div ref={drag} style={{ opacity }}>
        {data.components.type}
      </div>
    </>
  );
};

export default SideBarItem;
