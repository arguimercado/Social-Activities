import { IActivity } from '../../../models/Activity'
import { Button, Item, Label, Segment } from 'semantic-ui-react'


interface Props {
    activities: IActivity[],
    onViewClick: (activity: IActivity) => void,
    onDeleteClick: (activity:IActivity) => void
}
const ActivityList = ({activities,onViewClick,onDeleteClick} : Props) => {
  return (
    <Segment>
        <Item.Group divided>
            {activities.map((activity: IActivity) => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='h2'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue} </div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated='right' content='View' color='blue' onClick={() => onViewClick(activity)} />
                            <Button floated='right' content='Delete' color='red' onClick={() => onDeleteClick(activity)} />
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
  )
}

export default ActivityList