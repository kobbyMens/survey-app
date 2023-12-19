import type { FC } from "react";
import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";

//redux
import {
  sidebarItemAddedToPage,
  sidebarItemAddedToEmptyPage,
} from "../../../../redux/slices/surveySlice";
import { useDispatch } from "react-redux";
// constants
import { SURVEY_TOOLBOX } from "../../../../utils/survey/ItemTypes";
import styled from "styled-components";

// ==========================Type declarations======================================>

export interface SidebarDropResultType {
  type: string;
  questionType: string;
  path: string;
  dropPosition?: "left" | "right" | "top" | "bottom";
}
export interface SideBarComponentsType {
  type: string;
  content: string;
}

export interface SidebarDataType {
  id: string;
  type: string;
  name: string;
  components: SideBarComponentsType;
}

interface SidebarItemProps {
  Icon: any;
  data: SidebarDataType;
  showCopyIcon?: boolean;
}

// =============================Styled Components=====================================

const StyledSidebarItemContainer = styled.div`
  display: flex;
  color: #909090;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 1.2rem;
  width: auto;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transition: all 0.1s ease-in-out;
    background-color: #fff;
    border-radius: 1.2rem;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
    span.icon {
      color: #19b394;
    }
    span.item-text {
      color: #161616;
    }
  }
  div.child-container {
    display: flex;
    align-items: center;
    padding-top: 5px;
    span.icon {
      font-size: 18px;
      display: flex;
    }
    span.item-text {
      padding: 0 0.5rem;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

// =================================================================================>

const SideBarItem: FC<SidebarItemProps> = ({ data, Icon, showCopyIcon }) => {
  const dispatch = useDispatch();

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: SURVEY_TOOLBOX,
      options: { dropEffect: showCopyIcon ? "copy" : "move" },
      item: data,
      end: (item: any, monitor: DragSourceMonitor) => {
        const dropResult: SidebarDropResultType | null =
          monitor.getDropResult();

        if (dropResult) {
          const { path, dropPosition, questionType } = dropResult; //get path of drop results
          if (!path) {
            // sidebar item dropped on empty survey
            return;
          }
          if (path && !dropPosition) {
            // sidebar item dropped on an empty page
            dispatch(sidebarItemAddedToEmptyPage({ path, questionType }));
          }
          if (path && dropPosition) {
            //sidebar item dropped on a page with already existing questions.
            dispatch(sidebarItemAddedToPage(dropResult));
          }
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 1 : 1,
      }),
    }),
    [showCopyIcon]
  );
  return (
    <>
      <StyledSidebarItemContainer ref={drag} style={{ opacity }}>
        <div className="child-container">
          <span className="icon">{<Icon />}</span>
          <span className="item-text">{data.components.type}</span>
        </div>
      </StyledSidebarItemContainer>
    </>
  );
};

export default SideBarItem;
