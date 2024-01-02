import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";


interface Props {
  activities: IActivity[],
  selectedActivity: IActivity | undefined,

  isOpenForm: boolean,
  onViewClick: (activity: IActivity) => void,
  onEditClick: (id: string) => void,
  onCancelClick: () => void,
  onSubmitClick: (activity: IActivity) => void,
  onDeleteClick: (activity: IActivity) => void
}

const ActivityDashboard = ({isOpenForm, activities,selectedActivity, onViewClick,onEditClick,onCancelClick,onSubmitClick,onDeleteClick }: Props) => {


  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList 
          activities={activities} 
          onViewClick={onViewClick} 
          onDeleteClick={onDeleteClick}/>
      </Grid.Column>
      <Grid.Column width={6}>
				{(selectedActivity !== undefined && !isOpenForm) &&  <ActivityDetail activity={selectedActivity} onEditClick={onEditClick} />}
				{isOpenForm  && <ActivityForm activity={selectedActivity} onCancelClick={onCancelClick} onSubmitClick={onSubmitClick}/>}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
