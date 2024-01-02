import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/Activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [viewActivity, setViewActivity] = useState<IActivity | undefined>();
  const [openForm, setOpenForm] = useState<boolean>(false);

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
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);

    setOpenForm(false);
    setViewActivity(activity);
    
  }

  function handleDelete(activity: IActivity) {
    setActivities([...activities.filter(x => x.id !== activity.id)]);
  }

  useEffect(() => {
    async function getAsync() {
      var response = await axios.get("http://localhost:5000/api/activities");
      setActivities(response.data);
    }

    getAsync();
  }, []);

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
