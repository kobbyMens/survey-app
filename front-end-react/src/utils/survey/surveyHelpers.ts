export const closestSide = (
  distToTop: number,
  distToBottom: number,
  distToLeft: number,
  distToRight: number
): string | null => {
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
