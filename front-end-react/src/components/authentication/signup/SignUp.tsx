import { type FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// formik/mui
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

//social icons components
import SocialMediaIcon from "../SocialMediaIcon";
import "react-social-icons/facebook";
import "react-social-icons/linkedin";
import "react-social-icons/google";
import "react-social-icons/twitter";

//custom mui components
import CustomTextField from "../../materialUIComponents/CustomTextField";
import CustomFormActionButton from "../../materialUIComponents/CustomFormActionButton";
import CustomCheckBoxWithLabel from "../../materialUIComponents/CustomCheckBoxWithLabel";

// mui components
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

//constants
import { SIGNUP_ROUTE } from "../../../utils/endpoints";

//======================Type declarations==============>
interface SignUpRequestBodyType {
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  acceptedTerms?: boolean;
  receiveUpdates?: boolean;
}

// =====================Styled Components===============>
const StyledLoginContainer = styled.article`
  background-color: transparent;
  width: 100%;
  height: 100%;

  section.signup-header-section {
    margin: auto;
    header {
      display: flex;
      flex-direction: column;
      gap: calc(2.5 * 8px);
      h1 {
        font-family: "Besley", serif;
        font-size: 48px;
        font-weight: 700;
        color: var(--grey-secondary-font-color, #8a8a8a);
      }
      p {
        font-weight: 400;
        font-size: 24px;

        a {
          font-weight: 500;
          color: var(--green-background, rgb(0, 191, 111));
          text-decoration-line: underline;
        }
      }
    }
  }

  section.signup-form-section {
    margin: auto;

    div.error-login-message {
      position: relative;
      display: flex;
      border-style: solid;
      padding: calc(3 * 8px);
      border-radius: 8px;
      border-color: var(--error-color, #d32f2f);
      border-width: 1px 1px 1px 8px;
      background-color: #fff;
      margin-bottom: calc(5 * 8px);

      p {
        font-weight: 500;
        opacity: 0.9;
      }
      button {
        cursor: pointer;
        position: absolute;
        top: calc(1 * 8px);
        right: calc(1 * 8px);
        background: transparent;
        padding: 0;
        outline: none;
        border: medium none;
      }
    }

    form {
      div.signup-form-checkboxes-container {
        padding-top: calc(3 * 8px);
        padding-bottom: calc(1 * 8px);
        display: flex;
        flex-direction: column;
        gap: calc(1 * 8px);
      }

      div.input-fields {
        div.name-field-container {
          display: flex;
          gap: 16px;
          align-items: center;
        }
      }

      div.signup-form-action-buttons-container {
        div.signup-form-forgot-password {
          a {
            text-decoration-line: underline;
          }
        }
      }
    }

    div.signup-form-social-media {
      padding: calc(6 * 8px) calc(5 * 8px);
      display: flex;
      align-items: center;
      justify-content: space-between;

      div.social-media-text {
        font-size: 20px;
        font-weight: 600;
        color: var(--black-font-color);
      }

      div.social-media-icons-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(5 * 8px);
      }
    }
  }

  /* media queries */

  @media only screen and (width >= 1600px) {
    section.signup-header-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(8 * 8px) calc(0 * 8px);
    }

    section.signup-form-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding-bottom: calc(26 * 8px);
    }
  }

  @media only screen and (1200px <= width <= 1600px) {
    section.signup-header-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(8 * 8px) calc(0 * 8px);
    }

    section.signup-form-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding-bottom: calc(26 * 8px);

      form {
        div.signup-form-checkboxes-container {
          padding-top: calc(3 * 8px);
          padding-bottom: calc(1 * 8px);
          display: flex;
          flex-direction: column;
          gap: calc(1 * 8px);
        }
      }
    }
  }

  @media only screen and (904px <= width <= 1200px) {
    section.signup-header-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(6 * 8px) calc(6 * 8px) calc(1 * 8px);
    }

    section.signup-form-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(5 * 8px) calc(6 * 8px);
    }
  }

  @media only screen and (600px <= width <= 904px) {
    section.signup-header-section {
      width: calc(80 * 8px);
      padding: calc(6 * 8px) calc(6 * 8px) calc(1 * 8px);
    }

    section.signup-form-section {
      width: calc(80 * 8px);
      padding: calc(4 * 8px) calc(6 * 8px);

      form {
        div.signup-form-checkboxes-container {
          padding-top: calc(3 * 8px);
          padding-bottom: calc(1 * 8px);
          display: flex;
          flex-direction: column;
          gap: calc(1 * 8px);
        }
      }
    }
  }

  @media only screen and (width <= 600px) {
    section.signup-header-section {
      padding: calc(3 * 8px) calc(4 * 8px);

      header {
        display: flex;
        flex-direction: column;
        gap: calc(1.5 * 8px);
        h1 {
          font-size: 32px;
        }
        p {
          font-size: 24px;
        }
      }
    }

    section.signup-form-section {
      padding: calc(4 * 8px) calc(4 * 8px);

      form {
        div.signup-form-checkboxes-container {
          padding-top: calc(3 * 8px);
          padding-bottom: calc(0.5 * 8px);
          display: flex;
          flex-direction: column;
          gap: calc(1 * 8px);
        }

        div.input-fields {
          div.name-field-container {
            display: flex;
            flex-direction: column;
            gap: calc(2 * 8px);
          }
        }
      }

      div.signup-form-social-media {
        padding: calc(6 * 8px) calc(0 * 8px);
        div.social-media-icons-container {
          gap: calc(3 * 8px);
        }
      }
    }
  }
`;
const SignUp: FC = () => {
  const [errorLoginMessage, setErrorLoginMessage] = useState<string | null>(
    null
  );

  return (
    <StyledLoginContainer>
      <section className="signup-header-section">
        <header>
          <h1>Sign Up</h1>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </header>
      </section>
      <section className="signup-form-section">
        {errorLoginMessage && (
          <div className="error-login-message">
            <button
              onClick={() => {
                setErrorLoginMessage(null);
              }}
            >
              <CloseOutlinedIcon sx={{ fontSize: "22px", opacity: 0.8 }} />
            </button>

            <p>Failed sign up, {errorLoginMessage.toLocaleLowerCase()}</p>
          </div>
        )}

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
            acceptedTerms: false,
            receiveUpdates: false,
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(30, "This field must be less than 15 characters")
              .required("This field is required"),
            lastName: Yup.string()
              .max(30, "This field must be less than 15 characters")
              .required("This field is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("This field is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
            repeatPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Password must match")
              .required("Repeat Password is required"),
            acceptedTerms: Yup.boolean()
              .required("Required")
              .oneOf([true], "You must accept the terms and conditions."),
            receiveUpdates: Yup.boolean().optional(),
          })}
          onSubmit={async (
            values: SignUpRequestBodyType,
            { setSubmitting }
          ) => {
            try {
              let { data } = await axios.post(SIGNUP_ROUTE, values);

              if (data.status === "Successful") {
                setSubmitting(false);
              } else {
                console.log(data.message);
                setErrorLoginMessage(data.message);
                setSubmitting(false);
              }
            } catch (error) {
              console.log(error);
              setErrorLoginMessage(
                "Something went wrong, check your connection and try again"
              );
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-fields">
                <div className="name-field-container">
                  <Field
                    component={CustomTextField}
                    margin="normal"
                    required
                    fullWidth
                    sx={{ mt: 0 }}
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                  />

                  <Field
                    component={CustomTextField}
                    sx={{ mt: 0 }}
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                  />
                </div>

                <Field
                  component={CustomTextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />

                <Field
                  component={CustomTextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Field
                  component={CustomTextField}
                  margin="normal"
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  id="password"
                />
              </div>
              <div className="signup-form-checkboxes-container">
                <div>
                  <CustomCheckBoxWithLabel
                    label={
                      <p>
                        You agree to the{" "}
                        <a style={{ color: "rgb(0, 127, 170)" }}>
                          Terms of Use and Privacy Notice{" "}
                        </a>
                      </p>
                    }
                    checkboxName="acceptedTerms"
                  />
                </div>
                <div>
                  <CustomCheckBoxWithLabel
                    label={
                      <p>
                        You agree to receive product news and special promotions
                        via email. You can opt-out of these emails in your My
                        Account page anytime.{" "}
                      </p>
                    }
                    checkboxName="receiveUpdates"
                  />
                </div>
              </div>
              <div className="signup-form-action-buttons-container">
                <div className="signup-form-submit-button">
                  <CustomFormActionButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    SIGN UP
                  </CustomFormActionButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className="signup-form-social-media">
          <div className="social-media-text">
            <span>Or Sign Up With</span>
          </div>
          <div className="social-media-icons-container">
            <SocialMediaIcon iconText="Twitter" iconUrl={"www.twitter.com"} />
            <SocialMediaIcon iconText="LinkedIn" iconUrl={"www.linkedin.com"} />
            <SocialMediaIcon iconText="Fackbook" iconUrl={"www.facebook.com"} />
          </div>
        </div>
      </section>
    </StyledLoginContainer>
  );
};

export default SignUp;
