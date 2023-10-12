import { Route, Routes } from "react-router-dom";

//redux
import store from "./redux/store";
import { Provider } from "react-redux";

//components
import AuthProvider from "./components/authentication/login/AuthProvider";
import RequiredAuth from "./components/authentication/login/RequiredAuth";
import Home from "./components/home/Home";
import Login from "./components/authentication/login/Login";
import ErrorPage from "./components/ErrorPage";
import MyWorkspace from "./components/workspace/MyWorkspace";
import MySurveys from "./components/surveys/MySurveys";
import SignUp from "./components/authentication/signup/SignUp";
//
import "./App.css";

// ----------------------------------------------------------------------------
function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route errorElement={<ErrorPage />}>
              <Route path="/" element={<Login />} />
              <Route path="/admin/signup" element={<SignUp />} />
              <Route
                path="/home"
                element={
                  <RequiredAuth>
                    <Home />
                  </RequiredAuth>
                }
              />
              <Route
                path="/home/surveys"
                element={
                  <RequiredAuth>
                    <MySurveys />
                  </RequiredAuth>
                }
              />
              <Route
                path="/home/worksapce"
                element={
                  <RequiredAuth>
                    <MyWorkspace />
                  </RequiredAuth>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
