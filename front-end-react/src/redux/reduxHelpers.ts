import shortid from "shortid";

import type { QuestionType } from "../components/survey/surveyQuestion/QuestionContainer";

// =======================================================
export type DropPositionType = "top" | "right" | "bottom" | "left";

export const addQuestionToPage = (
  pageQuestions: QuestionType[],
  questionType: string,
  questionNumber: number,
  dropPosition: DropPositionType
): QuestionType[] => {
  const basicFormat = {
    type: questionType,
    id: shortid.generate(),
    name: "New question",
    choices: [
      { id: "item1", content: "item 1" },
      { id: "item2", content: "item 2" },
      { id: "item3", content: "item 3" },
    ],
  };

  //check if drop occurred aroud last question
  switch (dropPosition) {
    case "bottom":
      if (pageQuestions.length === questionNumber + 1) {
        pageQuestions.push(basicFormat);
        return pageQuestions;
      }
      pageQuestions = pageQuestions.splice(questionNumber + 1, 0, basicFormat);
      return pageQuestions;
    case "top":
      if (questionNumber === 0) {
        pageQuestions = pageQuestions.splice(0, 0, basicFormat);
        return pageQuestions;
      }
      pageQuestions = pageQuestions.splice(questionNumber - 1, 0, basicFormat);
      return pageQuestions;
    default:
      break;
  }

  // check if question has index 0 or is the first on a page

  return pageQuestions;
};

export const getPathData = (path: string): number[] => {
  const splitPath = path.split("-");
  const pageNumber = Number(splitPath[0]);
  const questionNumber = Number(splitPath[1]);

  return [pageNumber, questionNumber];
};
