import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { ServerErrorProvider } from "../context/ErrorContext";

function App() {
  const location = useLocation();
  

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>

      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}

    
    </>
  );
}

export default App;
