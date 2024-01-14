import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useStore } from "../../stores/store";
import BusyLoader from "../../components/loading/BusyLoader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const ProfilePage = () => {
  
	const {
    profileStore: { profile,loadProfile,loadingProfile},
  } = useStore();

	const {username} = useParams<{username: string}>();

	useEffect(() => {
		loadProfile(username!);
		
	},[loadProfile,username])
	
	if(loadingProfile) return <BusyLoader inverted={true} content='Loading profile...' />
  
	
	return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )

        }
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
