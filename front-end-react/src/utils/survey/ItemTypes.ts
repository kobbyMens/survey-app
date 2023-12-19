export const SURVEY_TOOLBOX = "sidebarItem";
export const QUESTION = "question";
export const CHOICE = "choice";
export const COMPONENT = "component";

export const ITEM_TYPES = {
  SURVEY_TOOLBOX,
  QUESTION,
  CHOICE,
  COMPONENT,
};
export interface SurveyDataType {
  type: string;
  id: string;
  children?: any[];
  path?: string;
}
