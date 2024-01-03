import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import BusyLoader from "../components/loading/BusyLoader";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {

  const {activityStore} = useStore()
 
  

  function handleCreateNew() {
    activityStore.createNewActivity();
  }

 

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <BusyLoader inverted={true} content="Loading" />;

  return (
    <>
      <Navbar onCreate={handleCreateNew} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
