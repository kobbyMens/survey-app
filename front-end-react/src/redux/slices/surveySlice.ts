import { initialData } from "../../utils/survey/initialData";

// redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";

//helpers
import { addQuestionToPage } from "../reduxHelpers";
import { getPathData } from "../reduxHelpers";

// ==================================================================>
import type { SidebarDropResultType } from "../../components/survey/surveySidebar/SideBarItem";

// ==================================================================>
interface SurveyQuestionEditedPayloadType {
  questionPath: string;
  text: string;
}
interface SurveyItemDeletedPayloadType {
  path: string;
}
// ===================================================================
export const slice = createSlice({
  name: "survey",
  initialState: initialData,
  reducers: {
    //add sidebar item to survey.
    sidebarItemAddedToPage: (
      state,
      action: PayloadAction<SidebarDropResultType>
    ) => {
      const { questionPath, questionType, dropPosition } = action.payload;

      const splitQuestionPath = questionPath.split("-");

      //get page number where the drop occured
      const pageNumber = Number(splitQuestionPath[0]);
      // get question number for dropPosition
      const questionNumber = Number(splitQuestionPath[1]);
      let pageQuestions = state.pages[pageNumber].elements;

      //insert new question at its drop position
      pageQuestions = addQuestionToPage(
        pageQuestions,
        questionType,
        questionNumber,
        dropPosition
      );
    },
    surveyQuestionEdited: (
      state,
      action: PayloadAction<SurveyQuestionEditedPayloadType>
    ) => {
      const { questionPath } = action.payload;
      const [pageNumber, questionNumber] = getPathData(questionPath);
      const question = state.pages[pageNumber].elements[questionNumber];
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

        const pageNumber = Number(splitPath[0]);
        state.pages.splice(pageNumber, 1);
      }
      if (splitPath.length == 2) {
        const [pageNumber, questionNumber] = getPathData(path);
        //remove question from elements
        state.pages[pageNumber].elements.splice(questionNumber, 1);
      }
    },
  },
});

// Actions
export const {
  sidebarItemAddedToPage,
  surveyQuestionEdited,
  surveyItemDeleted,
} = slice.actions;

// selector
export const pagesSelector = (state: RootState) => state.survey.pages;

// =============================================================

// Survey Reducer
export default slice.reducer;
