import shortid from "shortid";
import { SURVEY_TOOLBOX } from "./ItemTypes";

export const QUESTIONS_DATA = [
  {
    id: shortid.generate(),
    type: SURVEY_TOOLBOX,
    components: {
      type: "radio",
      content: "Question content",
    },
  },
  {
    id: shortid.generate(),
    type: SURVEY_TOOLBOX,
    components: {
      type: "checkbox",
      content: "Question Content",
    },
  },
];
