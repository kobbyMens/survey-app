import { type XYCoord } from "react-dnd";

// ===========================================================>
export const closestSide = (
  mouseXY: XYCoord,
  questionContainerDomRect: DOMRect
): string | null => {
  const distToTop = mouseXY.y - questionContainerDomRect.top;
  const distToBottom = questionContainerDomRect.bottom - mouseXY.y;
  const distToLeft = mouseXY.x - questionContainerDomRect.left;
  const distToRight = questionContainerDomRect.right - mouseXY.x;

  let closestSide;

  if (
    distToTop < distToBottom &&
    distToTop < distToLeft &&
    distToTop < distToRight
  ) {
    closestSide = "top";
  } else if (
    distToBottom < distToTop &&
    distToBottom < distToLeft &&
    distToBottom < distToRight
  ) {
    closestSide = "bottom";
  } else if (
    distToLeft < distToTop &&
    distToLeft < distToBottom &&
    distToLeft < distToRight
  ) {
    closestSide = "left";
  } else if (
    distToRight < distToTop &&
    distToRight < distToBottom &&
    distToRight < distToLeft
  ) {
    closestSide = "right";
  }

  if (closestSide) {
    return closestSide;
  } else {
    return null;
  }
};
