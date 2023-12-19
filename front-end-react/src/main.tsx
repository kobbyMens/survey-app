import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//components
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/authentication/login/Login";
import SurveyCreator from "./components/survey/SurveyCreator";
import SignUp from "./components/authentication/signup/SignUp";
import MyWorkspace from "./components/workspace/MyWorkspace";
import Donation from "./components/donation/Donation";
import Dashboard from "./components/dashboard/Dashboard";
//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";

//react-router
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom"; // react-router
import IndexHomePage from "./components/home/IndexHomePage";

// ================================================>

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<IndexHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/my-workspace" element={<MyWorkspace />} />
        <Route path="/design-survey" element={<SurveyCreator />} />
        <Route path="*" element={<ErrorPage />} />{" "}
        {/** Catch all route to catch errors**/}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
