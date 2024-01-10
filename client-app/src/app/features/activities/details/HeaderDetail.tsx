import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../stores/store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: IActivity;
  onRefresh: (id: string) => void;
}

const HeaderDetail = ({ activity,onRefresh }: Props) => {
  const {
    userStore: { user },
    activityStore: { updateAttendance,loading },
  } = useStore();

  const userHost = activity.attendees.find((x) => x.isHost);
  const isHost = userHost?.username === user?.username;

  function handleUpdateAttendance() {
    updateAttendance(activity.id).then(() => {
      onRefresh(activity.id);
    });
  }



  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date!, "dd MMMM yyyy")}</p>
                <p>
                  Hosted by <strong>{userHost?.displayname}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {!isHost && (
          (!activity.isGoing) ? 
              (<Button color="teal" loading={loading} onClick={handleUpdateAttendance}>Join Activity</Button>) : 
              (<Button loading={loading} onClick={handleUpdateAttendance}>Cancel attendance</Button>)
        )}
        {isHost && (
          <Button
            color="orange"
            floated="right"
            as={Link}
            to={`/edit/${activity.id}`}
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(HeaderDetail);
