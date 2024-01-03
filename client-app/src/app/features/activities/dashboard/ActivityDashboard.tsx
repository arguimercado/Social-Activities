import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import BusyLoader from "../../../components/loading/BusyLoader";




const ActivityDashboard = () => {

  
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <BusyLoader inverted={true} content="Loading" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList/>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filter</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
