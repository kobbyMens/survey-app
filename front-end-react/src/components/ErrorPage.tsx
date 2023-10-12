import { useRouteError } from "react-router-dom";
import "../App.css";
const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.log(error);

  return (
    <>
      <div id="error-page">
        <h1>Opps!</h1>
        <p>Sorry, an unexpected error has occcured</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
