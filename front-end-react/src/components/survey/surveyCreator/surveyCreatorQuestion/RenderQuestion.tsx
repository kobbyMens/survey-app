import { type FC, Fragment } from "react";
import { type ChoiceType } from "../surveyCreatorChoice/Choice";

//components
import Choice from "../surveyCreatorChoice/Choice";
import { AddOptionsToSurveyChoice } from "../surveyCreatorChoice/ChoiceComponents";

// redux
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { choiceAddedToQuestionChoices } from "../../../../redux/slices/surveySlice";
// ==================Type Declaration=================================>
interface RenderQuestionProps {
  question: any;
  questionPath: string;
}

const RenderQuestion: FC<RenderQuestionProps> = ({
  question,
  questionPath,
}) => {
  const dispatch = useAppDispatch();

  // =================Choice Option handlers==================================>
  const handleChoiceAdded = () => {
    dispatch(choiceAddedToQuestionChoices({ path: questionPath }));
  };

  const handleOtherAdded = () => {};
  const handleNoneAdded = () => {};

  const handleSelectAllAdded = () => {};

  switch (question.type) {
    case "radiogroup": {
      return (
        <form>
          {question.choices.map((choice: ChoiceType, index: number) => {
            const choicePath = `${questionPath}-${index}`;

            return (
              <Fragment key={choice.id}>
                <Choice
                  id={choice.id}
                  path={choicePath}
                  content={choice.content}
                />
              </Fragment>
            );
          })}
          <AddOptionsToSurveyChoice
            onClick={handleChoiceAdded}
            name={`item ${question.choices.length + 1}`}
          />
          <AddOptionsToSurveyChoice onClick={handleNoneAdded} name="None" />
          <AddOptionsToSurveyChoice
            onClick={handleOtherAdded}
            name="Other (describe)"
          />
        </form>
      );
    }
    case "checkbox": {
      return (
        <form>
          <AddOptionsToSurveyChoice
            onClick={handleSelectAllAdded}
            name="Select all"
          />

          {question.choices.map((choice: ChoiceType, index: number) => {
            const choicePath = `${questionPath}-${index}`;
            return (
              <Fragment key={choice.id}>
                <Choice
                  id={choice.id}
                  path={choicePath}
                  content={choice.content}
                />
              </Fragment>
            );
          })}
          <AddOptionsToSurveyChoice
            onClick={handleChoiceAdded}
            name={`item ${question.choices.length + 1}`}
          />
          <AddOptionsToSurveyChoice name="None" />
          <AddOptionsToSurveyChoice name="Other (describe)" />
        </form>
      );
    }
    default:
      return null;
  }
};

export default RenderQuestion;
