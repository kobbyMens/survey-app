import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { SIGNUP_ROUTE } from "../../../endpoints";
import { MyTextInput } from "../../formFieldsComponents";
import useOnlineStatus from "../../../hooks/useOnlineStatus";
interface AdminUser {
  firstName: string;
  lastName: string;
  email: string;
}

function SignUp() {
  const isOnline = useOnlineStatus();
  return (
    <div id="app-root">
      <div id="container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeat_password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "This field must be less than 15 characters")
              .required("This field is required"),
            lastName: Yup.string()
              .max(15, "This field must be less than 15 characters")
              .required("This field is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("This field is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
            repeat_password: Yup.string()
              .oneOf([Yup.ref("password")], "Password must match")
              .required("Repeat Password is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              let { data } = await axios.post(SIGNUP_ROUTE, values);

              if (data.status === "Successful") {
                console.log(data);
              }
              setSubmitting(false);
            } catch (error) {
              console.log(error);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form id="signup-form">
              <MyTextInput
                name="firstName"
                type="text"
                label="First Name"
                placeholder="Kobby"
              />
              <MyTextInput
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Mens"
              />
              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="mens@yahoo.com"
              />
              <MyTextInput
                name="password"
                type="password"
                label="Password"
                placeholder="*********"
              />
              <MyTextInput
                name="repeat_password"
                type="password"
                label="Repeat Password"
                placeholder="*********"
              />
              <button type="submit" disabled={!isOnline ? true : isSubmitting}>
                Signup
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <p>
            Already have an accout?{" "}
            <span>
              <Link to={"/"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
