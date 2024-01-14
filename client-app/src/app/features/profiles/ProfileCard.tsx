import { observer } from "mobx-react-lite"
import { IAttendee } from "../../models/Attendee";
import { Card,CardDescription,Icon,Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


interface Props {
    profile: IAttendee;
}

const ProfileCard = ({profile}: Props) => {
  return (
    <Card as={Link} to={`/profile/${profile.username}`}>
        <Image src={profile.image || '/assets/user.png'} />
        <Card.Content>
            <Card.Header>{profile.displayname}</Card.Header>
            <CardDescription>{profile.bio}</CardDescription>
        </Card.Content>
        <Card.Content extra>
            <Icon name="user" />
            20 followers
        </Card.Content>
    </Card>
  )
}

export default observer(ProfileCard)