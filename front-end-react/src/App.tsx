import { Outlet } from "react-router-dom";

//components
import MainHeader from "./components/home/header/MainHeader";
import AuthProvider from "./components/authentication/login/AuthProvider";
import RequiredAuth from "./components/authentication/login/RequiredAuth";

import ErrorPage from "./components/ErrorPage";
import MyWorkspace from "./components/workspace/MyWorkspace";
import MainSurveyCreatorContent from "./components/survey/SurveyCreator";
import SignUp from "./components/authentication/signup/SignUp";
import SurveyCreator from "./components/survey/surveyCreator/Creator";
import SurveyPreview from "./components/survey/previewSurvey/SurveyPreveiw";
import SurveyCreatorJSONEditor from "./components/survey/surveyJsonEditor/SurveyCreatorJSONEditor";
import SurveyThemes from "./components/survey/surveyCreatorthemes/SurveyThemes";
import IndexHomePage from "./components/home/IndexHomePage";
//
import "./App.css";

// ==================================================================>

function App() {
  return (
    <div>
      <MainHeader />
      {/* Main body*/}
      <main className="main-section">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
