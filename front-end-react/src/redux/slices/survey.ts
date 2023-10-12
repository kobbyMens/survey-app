import { initialData } from "../../utils/survey/initialData";

// redux
import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";

export const slice = createSlice({
  name: "survey",
  initialState: initialData,
  reducers: {
    //add sidebar item to survey.
    addSidebarItemToPage: (state, action) => {},
  },
});

// Actions
export const { addSidebarItemToPage } = slice.actions;

// selector
export const pagesSelector = (state: RootState) => state.survey.pages;

// =============================================================

// Survey Reducer
export default slice.reducer;
