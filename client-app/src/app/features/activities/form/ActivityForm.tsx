import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router";
import {v4 as uuid} from 'uuid';
import BusyLoader from "../../../components/loading/BusyLoader";
import { Link } from "react-router-dom";


const ActivityForm = () => {


  const {id} = useParams();
  const navigate = useNavigate();
 
  const [activity,setActivity] = useState<IActivity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  const {activityStore: {loadingInitial,loadActivity,saveActivity,updateActivity,submitLoading}} = useStore();

  useEffect(() => {
    console.log(id);
    if(id) 
      loadActivity(id).then(activity => setActivity(activity!));
    
    
  },[id,loadActivity])

  if (loadingInitial) return <BusyLoader inverted={true} content="Loading" />;


  function handleSubmit() {
    if(activity.id) {
      updateActivity(activity).then((response: IActivity | undefined) => navigate(`/activities/${response?.id}`));
    }
    else {
      activity.id = uuid(); 
      saveActivity(activity).then((response: IActivity | undefined) => navigate(`/activities/${response?.id}`));
    }
  }

  
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name,value} = event.target;
    setActivity((prev) => {
      return ({
        ...prev,
        [name]: value
      });
    });
    
  }


  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input  placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
        <Form.Input placeholder="Description" value={activity.description} name='description' onChange={handleInputChange}/>
        <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
        <Form.Input type='date' placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
        <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}/>
        <Button floated="right" loading={submitLoading} positive type="submit" content="Submit"  />
        <Button floated="right" positive type="button" content="Cancel" as={Link} to='/activities' />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
