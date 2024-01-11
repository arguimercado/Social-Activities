import { Link } from 'react-router-dom'
import { Segment,Item, Button } from 'semantic-ui-react'
import { useStore } from '../../../../stores/store';

const ActivityNew = () => {
  const {userStore : {user}} = useStore();
  return (
    <Segment.Group>
      <Segment >
        <Item.Group>
          <Item>
            <Item.Image size='mini' style={{marginBottom: 25}} circular src={user?.image || '/assets/user.png'} />
            <Item.Content>
              <Item.Header content="What's your plan today!!" />
              <Item.Description>
                <Button content="Create Activity" color="teal" size='mini' as={Link} to='/create' />
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}

export default ActivityNew