// redux
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//helpers
import {
  getPage,
  getQuestionPayload,
  getPathData,
  addSidebarItemToPage,
  removeItemFromPage,
  addItemToPage,
} from "../reduxHelpers";

//types
import type { SidebarDropResultType } from "../../components/survey/surveyCreator/surveyCreatorSidebar/SideBarItem";
import type { PageType } from "../../components/survey/surveyCreator/surveyCreatorPage/Page";
import { type DropPositionType } from "../reduxHelpers";
import shortid from "shortid";

// =================Type declarations===================================>
export interface SurveyState {
  pages: PageType[];
}
interface SidebarItemAddedToEmptyPageType {
  path: string;
  questionType: string;
}
interface SurveyQuestionEditedPayloadType {
  questionPath: string;
  text: string;
}
interface SurveyItemDeletedPayloadType {
  path: string;
}

interface SurveyQuestionMovedPayloadType {
  dragSourcePath: string;
  dropTargetPath: string;
  dropPosition: DropPositionType;
  type: string;
}
// ===================================================================
const initialState = {
  pages: [],
} as SurveyState;

// Empty page: Created outside and inserted into the action object as specified by redux.

export const slice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    sidebarItemAddedToEmptySurvey: {
      reducer: (state, action: PayloadAction<PageType>) => {
        //Add first page containing the dropped question type
        state.pages.push(action.payload);
        // Add another page to enable addition of questions to new page
        state.pages.push(getPage(shortid.generate(), "Page 2"));
      },
      prepare: (sidbarItemName: string) => {
        return {
          payload: {
            id: nanoid(),
            name: "Page 1",
            questions: [getQuestionPayload(sidbarItemName, 1)],
          },
        };
      },
    },
    //add sidebar item to survey.
    sidebarItemAddedToEmptyPage: (
      state,
      action: PayloadAction<SidebarItemAddedToEmptyPageType>
    ) => {
      const { path, questionType } = action.payload;

      const splitPath = path.split("-");
      //get page number where the drop occured
      const pageNumber = Number(splitPath[0]);
      const newQuestion = getQuestionPayload(questionType, 1);

      state.pages[pageNumber - 1].questions.push(newQuestion);
      if (pageNumber === state.pages.length) {
        //sidebar item added to last empty page.
        //add new empty page
        const newEmptyPageName = `Page ${state.pages.length + 1}`;
        state.pages.push(getPage(shortid.generate(), newEmptyPageName));
      }
    },

    sidebarItemAddedToPage: (
      state,
      action: PayloadAction<SidebarDropResultType>
    ) => {
      const { path, questionType, dropPosition } = action.payload;

      const splitPath = path.split("-");
      //get page number where the drop occured
      const pageNumber = Number(splitPath[0]);

      // get question number for dropPosition
      const questionNumber = Number(splitPath[1]);
      //insert new question at its drop position
      if (dropPosition) {
        let pageQuestions = state.pages[pageNumber - 1].questions;
        pageQuestions = addSidebarItemToPage(
          pageQuestions,
          questionType,
          questionNumber,
          dropPosition
        );
      }
    },
    surveyQuestionEdited: (
      state,
      action: PayloadAction<SurveyQuestionEditedPayloadType>
    ) => {
      const { questionPath } = action.payload;
      const [pageNumber, questionNumber] = getPathData(questionPath);
      const question = state.pages[pageNumber - 1].questions[questionNumber];
      question.name = action.payload.text;
    },

    surveyItemDeleted: (
      state,
      action: PayloadAction<SurveyItemDeletedPayloadType>
    ) => {
      const { path } = action.payload;
      const splitPath = path.split("-");

      if (splitPath.length == 1) {
        //handle page delete.
        if (state.pages.length === 2) {
          //If a page with questions and an empty page is left. Delete both
          // if the page with questions is deleted.
          state.pages.splice(0);
          return;
        }
        const pageNumber = Number(splitPath[0]);
        state.pages.splice(pageNumber - 1, 1); // substract 1 from page number to match page index.
      }

      if (splitPath.length == 2) {
        const [pageNumber, questionNumber] = getPathData(path);
        //remove question from elements
        state.pages[pageNumber - 1].questions.splice(questionNumber, 1); // substract 1 from page number to match page index.
        return;
      }

      if (splitPath.length === 3) {
        //remove choice from question choices.
        const location = splitPath[2];
        const questionPath = splitPath.slice(0, 2).join("-");
        const [pageNumber, questionNumber] = getPathData(questionPath);
        state.pages[pageNumber - 1].questions[questionNumber].choices.splice(
          location,
          1
        );
        return;
      }
    },
    choiceAddedToQuestionChoices: (
      state,
      action: PayloadAction<SurveyItemDeletedPayloadType>
    ) => {
      const { path } = action.payload;
      const [pageNumber, questionNumber] = getPathData(path);
      const question = state.pages[pageNumber - 1].questions[questionNumber];
      const choicesLength = question.choices.length;
      question.choices.push({
        id: shortid.generate(),
        content: `item ${choicesLength + 1}`,
      });
    },

    surveyQuestionMoved: (
      state,
      action: PayloadAction<SurveyQuestionMovedPayloadType>
    ) => {
      const { dragSourcePath, dropTargetPath, dropPosition, type } =
        action.payload;

      const removedItem = removeItemFromPage(state, dragSourcePath, type);
      addItemToPage(state, dropPosition, dropTargetPath, removedItem);
    },
  },
});

// Actionss
export const {
  sidebarItemAddedToPage,
  surveyQuestionEdited,
  surveyItemDeleted,
  sidebarItemAddedToEmptySurvey,
  sidebarItemAddedToEmptyPage,
  choiceAddedToQuestionChoices,
  surveyQuestionMoved,
} = slice.actions;

// selectors
export const pagesSelector = (state: RootState) => state.survey.pages;

// =============================================================

// Survey Reducer
export default slice.reducer;
