import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";




const ActivityDashboard = () => {
  
  const {activityStore} = useStore();

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList/>
      </Grid.Column>
      <Grid.Column width={6}>
				{(activityStore.selectedActivity !== null && !activityStore.editMode) &&  <ActivityDetail />}
				{activityStore.editMode  && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
