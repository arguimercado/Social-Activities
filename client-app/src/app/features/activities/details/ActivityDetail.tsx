import { Button, Card, CardHeader, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";



const ActivityDetail = () => {

  const {activityStore : {selectedActivity,editActivity}} = useStore();
  
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
						<Button basic color='green' onClick={editActivity}>Edit</Button>
						<Button basic color='red'>View</Button>
					</div>

				</Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);
