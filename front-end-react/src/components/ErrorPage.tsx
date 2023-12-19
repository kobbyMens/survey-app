import { useRouteError } from "react-router-dom";
import styled from "styled-components";

// ==============Styled Components=====================>

const ErrorPageContainer = styled.div`
  div.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(20 * 8px) calc(0 * 8px);

    h1 {
      margin-bottom: calc(2 * 8px);
    }
    p.main-message {
      margin-bottom: calc(1 * 8px);
      font-size: 18px;
    }

    p.error-message {
      margin: calc(1 * 8px) calc(0 * 8px);
      color: var(--grey-secondary-font-color, #161616);

      i {
        font-style: italic;
      }
    }
  }
`;

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();

  return (
    <>
      <ErrorPageContainer>
        <div className="wrapper">
          <h1>Opps!</h1>
          <p className="main-message">
            Sorry, an unexpected error has occcured
          </p>
          <p className="error-message">
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </ErrorPageContainer>
    </>
  );
};

export default ErrorPage;
