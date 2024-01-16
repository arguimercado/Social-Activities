import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import { IPhoto } from "../../../../models/Profile";
import { useStore } from "../../../../stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "./components/PhotoUploadWidget";
import { observer } from "mobx-react-lite";



const ProfilePhotos = () => {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploadingPhoto,
      setMainPhoto,
      deletePhoto,
      loading,
      photoCollection,
    },
  } = useStore();

  const [photoMode, setPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  
 

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setPhotoMode(false));
  }

  function handleSwitchMainAction(
    event: SyntheticEvent<HTMLButtonElement>,
    photo: IPhoto
  ) {
    var target = event.currentTarget.name;
    setTarget(target);
    setMainPhoto(photo);
  }

  function handleDeletePhotoAction(
    event: SyntheticEvent<HTMLButtonElement>,
    photo: IPhoto
  ) {
    var target = event.currentTarget.name;
    setTarget(target);
    deletePhoto(photo);
  }

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
          <PhotoUploadWidget
            uploadPhoto={handlePhotoUpload}
            uploading={uploadingPhoto}
          />
        ) : (
          <Card.Group itemsPerRow={5}>
            {photoCollection &&
              photoCollection.map((photo: IPhoto, index: number) => (
                <Card key={index}>
                  <Image circular src={photo?.url || "/assets/user.png"} />
                  {isCurrentUser && (
                    <Button.Group widths={2} fluid>
                      <Button
                        basic
                        name={`main${index}`}
                        positive
                        content="Main"
                        onClick={(e) => handleSwitchMainAction(e, photo)}
                        disabled={photo.isMain}
                        loading={loading && target === `main${index}`}
                      />
                      <Button
                      name={`del${index}`}
                        basic
                        negative
                        icon="trash"
                        loading={loading && target === `del${index}`}
                        onClick={(e) => handleDeletePhotoAction(e, photo)}
                        disabled={photo.isMain}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
          </Card.Group>
        )}
      </Grid.Column>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
