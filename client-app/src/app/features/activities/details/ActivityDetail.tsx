import { Button, Card, CardHeader, Image } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";

interface Props {
  activity: IActivity | undefined,
  onEditClick: (id: string) => void,
}

const ActivityDetail = ({ activity,onEditClick }: Props) => {
  return (
    <Card fluid={true}>
      <Image
        src={`/assets/categoryImages/${activity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <CardHeader>{activity?.title ?? ""}</CardHeader>
        <Card.Meta>{activity?.date}</Card.Meta>
        <Card.Description>
						<div>{activity?.description}</div>
						<div>{activity?.venue}, {activity?.city}</div>
				</Card.Description>
      </Card.Content>
				<Card.Content extra>	
					<div className="ui two buttons">
						<Button basic color='green' onClick={() => onEditClick(activity?.id ?? "")}>Edit</Button>
						<Button basic color='red'>View</Button>
					</div>

				</Card.Content>
    </Card>
  );
};

export default ActivityDetail;
