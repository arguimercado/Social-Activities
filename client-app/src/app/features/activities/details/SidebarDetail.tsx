import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Label, List, Segment, Image, Item } from "semantic-ui-react";
import { IProfile } from "../../../models/IProfile";

interface Props {
  attendees: IProfile[];
 
}

const SidebarDetail = ({ attendees }: Props) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length === 0
          ? "No one is attending yet"
          : attendees.length === 1
          ? "1 Person Going"
          : `${attendees.length} People Going`}
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item key={attendee.username} style={{ position: "relative" }}>
                {attendee.isHost && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right">
                    Host
                  </Label>
                )}

                <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
                />
                <Item.Content>
                <Item.Header as="h3">
                  <Link to={`/profiles/${attendee.username}`}>
                    {attendee.displayname}
                  </Link>
                </Item.Header>
                <Item.Extra>Following</Item.Extra>
                </Item.Content>
            </Item>
           
          ))}
        </List>
      </Segment>
    </>
  );
};

export default observer(SidebarDetail);
