import { Button, Card, CardHeader, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import BusyLoader from "../../../components/loading/BusyLoader";



const ActivityDetail = () => {

  const {activityStore : {selectedActivity,loadActivity,loadingInitial}} = useStore();
  const {id} = useParams();

  useEffect(() => {
    if(id) loadActivity(id)
  },[id])

  if (loadingInitial || !selectedActivity) return <BusyLoader inverted={true} content="Loading" />;

  return (
    <Card fluid={true}>
      <Image
        src={`/assets/categoryImages/${selectedActivity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <CardHeader>{selectedActivity?.title ?? ""}</CardHeader>
        <Card.Meta>{selectedActivity?.date}</Card.Meta>
        <Card.Description>
						<div>{selectedActivity?.description}</div>
						<div>{selectedActivity?.venue}, {selectedActivity?.city}</div>
				</Card.Description>
      </Card.Content>
				<Card.Content extra>	
					<div className="ui two buttons">
						<Button basic color='green' as={Link} to={`/edit/${selectedActivity?.id}`} >Edit</Button>
						<Button basic color='red'>View</Button>
					</div>

				</Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);
