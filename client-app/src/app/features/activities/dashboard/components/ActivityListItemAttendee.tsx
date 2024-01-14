import { observer } from "mobx-react-lite"
import { List,Image, Label, Popup } from "semantic-ui-react"
import { IAttendee } from "../../../../models/Attendee"
import { Link } from "react-router-dom"
import ProfileCard from "../../../profiles/ProfileCard"

interface Props {
  attendees: IAttendee[]
}

const ActivityListItemAttendee = ({attendees} : Props) => {
    
    const guestAttendees = attendees ? attendees.filter(x => x.isHost === false) : [];

    return (
      <List horizontal>
        {guestAttendees.map(attendee => (
          <Popup
            hoverable
            key={attendee.username}
            trigger={
              <List.Item key={attendee.username}>
              <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', gap:10}}>
                <Label image as={Link} to={`/profile/${attendee.username}`}>
                  <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                  {attendee.displayname}
                </Label>
  
              </div>
            </List.Item>
            }
          >
            <Popup.Content>
              <ProfileCard profile={attendee} />
            </Popup.Content>
          </Popup>
         
        ))}
       
      </List>
  )
}

export default observer(ActivityListItemAttendee)