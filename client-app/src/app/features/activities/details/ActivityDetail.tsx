import { Grid } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import BusyLoader from "../../../components/loading/BusyLoader";
import HeaderDetail from "./HeaderDetail";
import InfoDetail from "./InfoDetail";
import ChatDetail from "./ChatDetail";
import SidebarDetail from "./SidebarDetail";



const ActivityDetail = () => {

  const {activityStore : {selectedActivity, loadActivity,loadingInitial,clearSelectedActivity}} = useStore();
  
  const {id} = useParams();

  useEffect(() => {
    if(id) loadActivity(id)

    return () => clearSelectedActivity();
  },[id,loadActivity,clearSelectedActivity])

  function handleRefresh(id: string) {
    loadActivity(id,true);
  }

  if (loadingInitial || !selectedActivity) return <BusyLoader inverted={true} content="Loading" />;

  return (
   <Grid>
    <Grid.Column width={10}>
      <HeaderDetail activity={selectedActivity} onRefresh={handleRefresh}  />
      <InfoDetail activity={selectedActivity} />
      <ChatDetail activityId={selectedActivity.id} />
    </Grid.Column>
    <Grid.Column width={6}>
      <SidebarDetail attendees={selectedActivity.attendees!}/>
    </Grid.Column>
   </Grid>
  );
};

export default observer(ActivityDetail);
