import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import LoginForm from "../features/users/LoginForm";
import { useEffect } from "react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import BusyLoader from "../components/loading/BusyLoader";
import Login from "../features/users/Login";

function App() {
  const {commonStore,userStore} = useStore();
  const location = useLocation();
  
  useEffect(() => {
    if(commonStore.token) userStore.getUser().finally(() => commonStore.setAppLoaded());
    else commonStore.setAppLoaded();
    
  },[commonStore,userStore])

  if(!commonStore.appLoaded) return <BusyLoader inverted={true} content="Loading App.."/>

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>

      {location.pathname === "/" ? (
        <Login />
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

export default observer(App);
