import { observer } from "mobx-react-lite";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import { useState } from "react";
import ProfileEditForm from "./components/ProfileEditForm";
import ProfileData from "./components/ProfileData";

const ProfileAbout = () => {
  const { profileStore } = useStore();
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header icon="user" content="About" floated="left" />
          {profileStore.isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
		<Grid.Column width={16}>
			{editMode ? (
				<ProfileEditForm setEditMode={setEditMode} />
			) : (
				<ProfileData  />
			)}
		</Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileAbout);
