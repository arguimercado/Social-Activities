import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/Activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import BusyLoader from "../components/loading/BusyLoader";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [viewActivity, setViewActivity] = useState<IActivity | undefined>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  function handleCreate() {
    setViewActivity(undefined);
    setOpenForm(true);
  }

  function handleView(value: IActivity) {
    setViewActivity(value);
    setOpenForm(false);
  }

  function handleEdit() {
    setOpenForm(true);
  }

  function handleCancel() {
    setOpenForm(false);
  }

  function handleCreateOrUpdate(activity: IActivity) {
    
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setOpenForm(false);
        setViewActivity(activity);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setOpenForm(false);
        setViewActivity(activity);
      });
    }
  }

  function handleDelete(activity: IActivity) {
    setActivities([...activities.filter((x) => x.id !== activity.id)]);
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      setActivities(response);
      setLoading(false);
    });
  }, []);

  if (loading) return <BusyLoader inverted={true} content="Loading" />;

  return (
    <>
      <Navbar onCreate={handleCreate} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={viewActivity}
          isOpenForm={openForm}
          onCancelClick={handleCancel}
          onSubmitClick={handleCreateOrUpdate}
          onEditClick={handleEdit}
          onViewClick={handleView}
          onDeleteClick={handleDelete}
        />
      </Container>
    </>
  );
}

export default App;
