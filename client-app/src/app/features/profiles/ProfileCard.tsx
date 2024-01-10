import { observer } from "mobx-react-lite"
import { IProfile } from "../../models/IProfile";
import { Card,CardDescription,Icon,Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


interface Props {
    profile: IProfile;
}

const ProfileCard = ({profile}: Props) => {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
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