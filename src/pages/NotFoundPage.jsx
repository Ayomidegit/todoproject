import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 – Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <Link to="/" style={{ marginTop: "1rem", display: "inline-block" }}>
        🔙 Go Back Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
