import { Link } from 'react-router-dom'
import { Segment,Item, Button } from 'semantic-ui-react'

const ActivityNew = () => {
  return (
    <Segment.Group>
      <Segment >
        <Item.Group>
          <Item>
            <Item.Image size='mini' circular src='/assets/user.png' />
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