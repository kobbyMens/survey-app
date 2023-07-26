import React from "react";
import "./Survey.css";

const Survey: React.FC = () => {
  const submitSurvey = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div id="container">
      <h1>What is your programming stack?</h1>
      <p>Fill this questionnaire to discover yourself</p>

      <form id="question">
        {/* Question 1*/}
        <h2>What is the size of the team you work for</h2>
        <label>
          <input type="radio" name="Q1" value="c1" />
          Very large
        </label>
        <br />
        <label>
          <input type="radio" name="Q1" value="c2" />
          Large
        </label>
        <br />
        <label>
          <input type="radio" name="Q1" value="c3" />
          Small
        </label>
        <br />
        <label>
          <input type="radio" name="Q1" value="c4" />
          Very small
        </label>
        <br />

        {/* Question 2 */}
        <h2>Which part of the project did you make contributions to</h2>
        <label>
          <input type="radio" name="Q2" value="c1" />
          Front-end
        </label>
        <br />
        <label>
          <input type="radio" name="Q2" value="c2" />
          Back-end
        </label>
        <br />
        <label>
          <input type="radio" name="Q2" value="c3" />
          Front-end and back-end
        </label>
        <br />
        <label>
          <input type="radio" name="Q2" value="c4" />
          Front-end, back-end and code debugging
        </label>
        <br />
        <button type="submit" id="submit" onClick={submitSurvey}>
          Submit your survey
        </button>
        <button type="reset" id="reset"></button>
      </form>
    </div>
  );
};

export default Survey;
