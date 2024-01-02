import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/Activity";
import { ChangeEvent, useState } from "react";

interface Props {
  activity: IActivity | undefined,
  onCancelClick: () => void,
  onSubmitClick: (activity: IActivity) => void
}

const ActivityForm = ({ activity : selectedActivity,onCancelClick,onSubmitClick }: Props) => {


  const defaultState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity,setActivity] = useState<IActivity>(defaultState);


  function handleSubmit() {
    onSubmitClick(activity);
  }

  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name,value} = event.target;
    setActivity((prev) => ({
      ...prev,
      [name]: value
    }));
  }


  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete={false}>
        <Form.Input  placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
        <Form.Input placeholder="Description" value={activity.description} name='description' onChange={handleInputChange}/>
        <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}/>
        <Form.Input type='date' placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange}/>
        <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}/>
        <Button floated="right" positive type="submit" content="Submit"  />
        <Button floated="right" positive type="button" content="Cancel" onClick={onCancelClick} />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
