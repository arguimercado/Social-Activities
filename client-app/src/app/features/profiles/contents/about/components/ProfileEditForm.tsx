import { Form, Formik } from "formik"
import { useStore } from "../../../../../stores/store";
import { CstTextArea, CstTextInput } from "../../../../../components";
import { Button } from "semantic-ui-react";
import { IProfile } from "../../../../../models/Profile";
import { observer } from "mobx-react-lite";

interface Props {
    setEditMode: (editMode: boolean) => void;

}

const ProfileEditForm = ({setEditMode} : Props) => {
    
    const {profileStore} = useStore();
    
   
    function handleFormSubmit(profile: IProfile) {
        profileStore.updateProfile(profile).then(() => {
            setEditMode(false);
        });
    }

  return (
    <Formik
        initialValues={profileStore.profile!}
        onSubmit={(values) => handleFormSubmit(values)}>
        {({handleSubmit}) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                <CstTextInput name="displayname" placeholder="Display Name" label="Display Name" />
                <CstTextArea  placeholder="Add your bio" name="bio" label="Bio" />
                <Button
                    floated="right"
                    positive
                    type="submit"
                    content="Update profile"
                    loading={profileStore.loading}/>
            </Form>
        )}
    </Formik>
  )
}


export default observer(ProfileEditForm)