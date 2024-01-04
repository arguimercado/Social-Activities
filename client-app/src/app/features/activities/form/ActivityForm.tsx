import { Button, Header, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import { useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router";
import BusyLoader from "../../../components/loading/BusyLoader";
import { Link } from "react-router-dom";
import { Formik,Form } from "formik";
import * as Yup from 'yup';
import { CstTextInput,CstTextArea } from "../../../components";
import CstDropdown from "../../../components/form/CstDropdown";
import { categoryOptions } from "../../../components/options/categoryOptions";
import CstDateInput from "../../../components/form/CstDateInput";



const ActivityForm = () => {


  const {id} = useParams();
  const navigate = useNavigate();
 
  const [activity,setActivity] = useState<IActivity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: ''
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('The date is required'),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  })

  const {activityStore: {loadingInitial,loadActivity,saveActivity,updateActivity,submitLoading}} = useStore();

  useEffect(() => {
   
    if(id) 
      loadActivity(id).then(activity => setActivity(activity!));
    
    
  },[id,loadActivity])

  if (loadingInitial) return <BusyLoader inverted={true} content="Loading" />;


  function handleFormSubmit(activity: IActivity) {
    if(activity.id) {
      updateActivity(activity).then((response: IActivity | undefined) => navigate(`/activities/${response?.id}`));
    }
    else {
      saveActivity(activity).then((response: IActivity | undefined) => navigate(`/activities/${response?.id}`));
    }
  }

  


  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
    <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={activity} 
      onSubmit={values => handleFormSubmit(values)}>
      {({handleSubmit,isValid,isSubmitting,dirty}) => (
        <Form className='ui form' onSubmit={handleSubmit}>
          <CstTextInput name='title' placeholder="Title" />
          <CstTextArea placeholder="Description"  name='description' />
          <CstDropdown options={categoryOptions} placeholder="Category"  name='category'/>
          <CstDateInput  
              placeholderText="Date" 
              name='date'
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa" 
              
            />
          <Header content='Location Details' sub color='teal' />
          <CstTextInput placeholder="City"  name='city' />
          <CstTextInput placeholder="Venue"  name='venue' />
          <Button
              disabled={isSubmitting || !dirty || !isValid} 
              floated="right" 
              loading={submitLoading} 
              positive 
              type="submit" content="Submit"  />
          <Button floated="right" positive type="button" content="Cancel" as={Link} to='/activities' />
        </Form>
      )}
    </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
