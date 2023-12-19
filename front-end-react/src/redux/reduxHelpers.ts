import shortid from "shortid";
import type { QuestionType } from "../components/survey/surveyCreator/surveyCreatorQuestion/QuestionContainer";
import { PageType } from "../components/survey/surveyCreator/surveyCreatorPage/Page";
import { type SurveyState } from "./slices/surveySlice";
// constants
import { QUESTION, CHOICE } from "../utils/survey/ItemTypes";

//redux
import { current } from "@reduxjs/toolkit";
// =====================Type Declaration==================================>
export type DropPositionType = "top" | "right" | "bottom" | "left";

// =======================================================================>
export const addSidebarItemToPage = (
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
  const choiceNumber = Number(splitPath[2]);

  return [pageNumber, questionNumber, choiceNumber];
};

export const getPage = (id: string, pageName: string): PageType => {
  return {
    id,
    name: pageName,
    questions: [],
  };
};

export const getQuestionPayload = (
  sidebarItemName: string,
  questionNumber: number
) => {
  switch (sidebarItemName) {
    case "checkbox":
      return {
        name: `question ${questionNumber}`,
        id: shortid.generate(),
        type: sidebarItemName,
        choices: [
          { id: shortid.generate(), content: "choice 1" },
          { id: shortid.generate(), content: "choice 2" },
          { id: shortid.generate(), content: "choice 3" },
        ],
      };
    case "radiogroup":
      return {
        name: `question ${questionNumber}`,
        id: shortid.generate(),
        type: sidebarItemName,
        choices: [
          { id: shortid.generate(), content: "choice 1" },
          { id: shortid.generate(), content: "choice 2" },
          { id: shortid.generate(), content: "choice 3" },
        ],
      };
    default:
      break;
  }
};

export const removeItemFromPage = (
  state: SurveyState,
  dragSourcePath: string,
  type: string
) => {
  const [pageNumber, questionNumber, choiceNumber] =
    getPathData(dragSourcePath);

  if (type === QUESTION) {
    const removedQuestion = state.pages[pageNumber - 1].questions.splice(
      questionNumber,
      1
    );

    return current(removedQuestion[0]); // current extracts a copy of wrapped data and returns a raw object
  }

  if (type === CHOICE) {
    const removedChoice = state.pages[pageNumber - 1].questions[
      questionNumber
    ].choices.splice(choiceNumber, 1);
    return current(removedChoice[0]);
  }
};

export const addItemToPage = (
  state: any,
  dropPosition: DropPositionType,
  dropTargetPath: string,
  item: any
) => {
  const [dropTargetPageNumber, dropTargetQuestionNumber] =
    getPathData(dropTargetPath);

  // drag and drop on the same page
  if (dropPosition === "bottom") {
    state.pages[dropTargetPageNumber - 1].questions.splice(
      dropTargetQuestionNumber + 1,
      0,
      item
    );
  }
  if (dropPosition === "top") {
    state.pages[dropTargetPageNumber - 1].questions.splice(
      dropTargetQuestionNumber,
      0,
      item
    );
  }
};
