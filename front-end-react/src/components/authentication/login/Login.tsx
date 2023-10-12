import { Form, Formik } from "formik";
import * as Yup from "yup";
import "../signup/SignUp.css";
import axios from "axios";
import { LOGIN_ROUTE } from "../../../endpoints";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MyTextInput } from "../../formFieldsComponents";
import { useState } from "react";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
import useAuth from "../../../hooks/useAuth";

interface Values {
  password: string;
  email: string;
}
function Login() {
  let auth = useAuth();
  let [serverErrorMessage, setServerErrorMessage] = useState<any>(null);
  const isOnline = useOnlineStatus();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/home";
  return (
    <div id="app-root">
      <div id="container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={async (values: Values, { setSubmitting }) => {
            try {
              let { data } = await axios.post(LOGIN_ROUTE, values);
              if (data.status === "Successful") {
                auth.setUser(data.user.email);
                navigate(from, { replace: true });
                setSubmitting(false);
              } else {
                setServerErrorMessage(data.message);
                setSubmitting(false);
              }
            } catch (error: any) {
              console.log(error);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form id="signup-form">
              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="mens@yahoo.com"
                servererrormessage={serverErrorMessage}
              />
              <MyTextInput
                name="password"
                type="password"
                label="Password"
                placeholder="*********"
              />
              <button type="submit" disabled={!isOnline ? true : isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <p>
            Create new account.{" "}
            <span>
              <Link to={"admin/signup"}>Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
