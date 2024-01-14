import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import { IPhoto } from "../../models/Profile";
import { useStore } from "../../stores/store";
import { useState } from "react";
import PhotoUploadWidget from "../../components/imageUpload/PhotoUploadWidget";

interface Props {
  photos?: IPhoto[] | null;
}

const ProfilePhotos = ({ photos }: Props) => {
  const {
    profileStore: { isCurrentUser },
  } = useStore();

  const [ photoMode, setPhotoMode ] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon={"image"} content={"Photos"} />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={photoMode ? "Cancel" : "Add Photo"}
			        onClick={() => setPhotoMode(!photoMode)}
            />
          )}
        </Grid.Column>
      </Grid>
      <Grid.Column width={16}>
        {photoMode ? (
          <PhotoUploadWidget />
        ) : (

          <Card.Group itemsPerRow={5}>
            {photos &&
              photos.map((photo: IPhoto, index: number) => (
                <Card key={index}>
                  <Image circular src={photo?.url || "/assets/user.png"} />
                </Card>
              ))}
          </Card.Group>

        )}

      </Grid.Column>

    </Tab.Pane>
  );
};

export default ProfilePhotos;
