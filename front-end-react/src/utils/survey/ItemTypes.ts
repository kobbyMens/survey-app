export const SURVEY_TOOLBOX = "sidebarItem";
export const QUESTION = "question";
export const ANSWER_CHOICE = "answer-choice";
export const COMPONENT = "component";

export const ITEM_TYPES = {
  SURVEY_TOOLBOX,
  QUESTION,
  ANSWER_CHOICE,
  COMPONENT,
};
export interface SurveyDataType {
  type: string;
  id: string;
  children?: any[];
  path?: string;
}
