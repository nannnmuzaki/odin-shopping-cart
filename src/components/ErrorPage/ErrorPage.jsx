import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import classes from "./ErrorPage.module.css";

export function ErrorPage() {
  const error = useRouteError();

  let title = "404 - Page Not Found";
  let message = "The page you are looking for does not exist.";

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className={classes.errorPage}>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/" className={classes.homeLink}>
        Return to Safety
      </Link>
    </div>
  );
}
