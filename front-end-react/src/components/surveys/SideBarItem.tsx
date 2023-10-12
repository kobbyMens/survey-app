import type { FC } from "react";
import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";
import { SURVEY_TOOLBOX } from "../../utils/survey/ItemTypes";

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
const SideBarItem: FC<SidebarItemProps> = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: SURVEY_TOOLBOX,
    item: data,
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
