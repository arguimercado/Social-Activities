import {
  Button,
  Icon,
  Item,
  Label,
  List,
  ListItem,
  Segment,
} from "semantic-ui-react";
import { IActivity } from "../../../../models/Activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
  activity: IActivity;
}
const ActivityListItem = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment raised>
        <Label basic color="blue" ribbon="right">
          Hosted By: {activity.hostUsername}
        </Label>
        <Item.Group>
          <Item>
            <Item.Image style={{marginBottom: '3px'}} size="tiny" circular src="/assets/user.png" />
            <Item.Content style={{ position: "relative" }}>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>

              <Item.Description>
                <div style={{display: 'flex', alignItems:'center', gap:10}}>
                  <div style={{color: '#2874A6'}}>
                    <Icon name="clock" />
                    {format(activity.date!, "dd MMM yyyy h:mm aa")}
                  </div>
                  <div style={{color:'#F39C12'}}>
                    <Icon name="marker" />
                    {activity.city}, {activity.venue}
                  </div>
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
      {activity.description}
     
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          icon="eye"
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          basic
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
