import { IActivity } from "../../../models/Activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";


const ActivityList = () => {

  const { activityStore } = useStore();
  const [deleteTarget,setDeleteTarget] = useState<string>("");

  

  function handleDeleteClick(e: SyntheticEvent<HTMLButtonElement>,id: string) {
    setDeleteTarget(e.currentTarget.name);
    activityStore.deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activities.map((activity: IActivity,index: number) => (
          <Item key={index}>
            <Item.Content>
              <Item.Header as="h2">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}{" "}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/activities/${activity.id}`}

                />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={activityStore.deleteLoading &&  deleteTarget === activity.id}
                  onClick={(e) => handleDeleteClick(e,activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
