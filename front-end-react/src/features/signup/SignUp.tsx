import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";

const SignUp: React.FC = () => {
  //formik custom form validations. Must return an object or errors

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeat_password: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form id="signup-form" onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="error">{formik.errors.firstName}</div>
      ) : null}
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="error">{formik.errors.lastName}</div>
      ) : null}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.errors.email && formik.touched.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.errors.password && formik.touched.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}
      <label htmlFor="repeat-password">Repeat Password</label>
      <input
        id="repeat_password"
        name="repeat_password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.repeat_password}
      />
      {formik.errors.repeat_password && formik.touched.repeat_password ? (
        <div className="error">{formik.errors.repeat_password}</div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
