import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";
import BusyLoader from "../../../components/loading/BusyLoader";
import ActivityFilters from "./ActivityFilters";
import ActivityForm from "../form/ActivityForm";
import ActivityNew from "./ActivityNew";




const ActivityDashboard = () => {

  
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <BusyLoader inverted={true} content="Loading Activities..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityNew />
        <ActivityList/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
