import shortid from "shortid";
import { SURVEY_TOOLBOX } from "./ItemTypes";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
export const QUESTIONS_DATA = [
  {
    id: shortid.generate(),
    type: SURVEY_TOOLBOX,
    name: "radiogroup",
    icon: RadioButtonCheckedIcon,
    components: {
      type: "Radio Group Button",
      content: "Question content",
    },
  },
  {
    id: shortid.generate(),
    type: SURVEY_TOOLBOX,
    name: "checkbox",
    icon: ChecklistRtlIcon,
    components: {
      type: "Checkboxes",
      content: "Question Content",
    },
  },
];
