import { FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// formik/mui
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

//redux
import { loggedIn } from "../../../redux/slices/authSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";

//social icons components
import SocialMediaIcon from "../SocialMediaIcon";
import "react-social-icons/facebook";
import "react-social-icons/linkedin";
import "react-social-icons/google";
import "react-social-icons/twitter";

//custom mui components
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CustomTextField from "../../materialUIComponents/CustomTextField";
import CustomFormActionButton from "../../materialUIComponents/CustomFormActionButton";
import CustomCheckBoxWithLabel from "../../materialUIComponents/CustomCheckBoxWithLabel";

//======================Type declarations==============>
interface LoginRequestBodyType {
  password: string;
  email: string;
  acceptedTerms: boolean;
  rememberMe: boolean;
}

//constants
import { LOGIN_ROUTE } from "../../../utils/endpoints";
import shortid from "shortid";

// =====================Styled Components===============>
const StyledLoginContainer = styled.article`
  background-color: transparent;
  width: 100%;
  height: 100%;

  section.login-header-section {
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

  section.login-form-section {
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
      div.login-form-action-buttons-container {
        div.login-form-forgot-password {
          a {
            text-decoration-line: underline;
          }
        }
      }
    }

    div.login-form-social-media {
      padding: calc(6 * 8px) calc(5 * 8px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      div.social-media-text {
        font-size: 20px;
        font-weight: 600;
        color: var(--black-font-color, #0a0808);
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
    section.login-header-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(8 * 8px) calc(0 * 8px);
    }

    section.login-form-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding-bottom: calc(26 * 8px);
    }
  }

  @media only screen and (1200px <= width <= 1600px) {
    section.login-header-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(8 * 8px) calc(0 * 8px);
    }

    section.login-form-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding-bottom: calc(26 * 8px);
    }
  }

  @media only screen and (904px <= width <= 1200px) {
    section.login-header-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(6 * 8px) calc(6 * 8px) calc(1 * 8px);
    }

    section.login-form-section {
      width: calc(80 * 8px);
      margin: 0 auto;
      padding: calc(5 * 8px) calc(6 * 8px);
    }
  }

  @media only screen and (600px <= width <= 904px) {
    section.login-header-section {
      width: calc(80 * 8px);
      padding: calc(6 * 8px) calc(6 * 8px) calc(1 * 8px);
    }

    section.login-form-section {
      width: calc(80 * 8px);
      padding: calc(4 * 8px) calc(6 * 8px);
    }
  }

  @media only screen and (width <= 600px) {
    section.login-header-section {
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

    section.login-form-section {
      padding: calc(4 * 8px) calc(4 * 8px);

      form {
        div.login-form-checkboxes-container {
          padding-top: calc(1 * 8px);
          display: flex;
          flex-direction: column;
          gap: calc(0.5 * 8px);
        }
      }

      div.login-form-social-media {
        padding: calc(6 * 8px) calc(0 * 8px);
        div.social-media-icons-container {
          gap: calc(3 * 8px);
        }
      }
    }
  }
`;
const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorLoginMessage, setErrorLoginMessage] = useState<string | null>(
    null
  );

  return (
    <StyledLoginContainer>
      <section className="login-header-section">
        <header>
          <h1>Login</h1>
          <p>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        </header>
      </section>
      <section className="login-form-section">
        {errorLoginMessage && (
          <div className="error-login-message">
            <button
              onClick={() => {
                setErrorLoginMessage(null);
              }}
            >
              <CloseOutlinedIcon sx={{ fontSize: "22px", opacity: 0.8 }} />
            </button>

            <p>{errorLoginMessage}</p>
          </div>
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
            acceptedTerms: false,
            rememberMe: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
            acceptedTerms: Yup.boolean()
              .required("Required")
              .oneOf([true], "You must accept the terms and conditions."),
            rememberMe: Yup.boolean().optional(),
          })}
          onSubmit={async (values: LoginRequestBodyType, { setSubmitting }) => {
            try {
              const { email, password } = values;

              const { data } = await axios.post(LOGIN_ROUTE, {
                email,
                password,
              });

              const userToken = shortid.generate();
              if (data.status === "Successful") {
                navigate("/");
                dispatch(loggedIn({ userData: data.user, userToken }));
                setSubmitting(false);
              } else {
                setErrorLoginMessage(data.message);
                setSubmitting(false);
              }
            } catch (error: any) {
              setErrorLoginMessage(
                "Something went wrong, check your connection and try again"
              );
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="login-form-input-fields">
                <Field
                  component={CustomTextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  sx={{ mt: 0 }}
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
              </div>
              <div className="login-form-checkboxes-container">
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
                    label={<p>Remember Me</p>}
                    checkboxName="rememberMe"
                  />
                </div>
              </div>
              <div className="login-form-action-buttons-container">
                <div className="login-form-submit-button">
                  <CustomFormActionButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? "loading" : "Log In"}
                  </CustomFormActionButton>
                </div>
                <div className="login-form-forgot-password">
                  <Link to="">Forgot your password?</Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="login-form-social-media">
          <div className="social-media-text">
            <span>Or Log In With</span>
          </div>
          <div className="social-media-icons-container">
            <SocialMediaIcon iconText="twitter" iconUrl={"www.twitter.com"} />
            <SocialMediaIcon iconText="LinkedIn" iconUrl={"www.linkedin.com"} />
            <SocialMediaIcon iconText="Fackbook" iconUrl={"www.facebook.com"} />
          </div>
        </div>
      </section>
    </StyledLoginContainer>
  );
};

export default Login;
