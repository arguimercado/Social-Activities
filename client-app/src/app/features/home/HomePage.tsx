import { Link } from "react-router-dom"
import { Container, Header, Segment,Image, Button } from "semantic-ui-react"
import { useStore } from "../../stores/store";

const HomePage = () => {
  const {userStore} = useStore();
  
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
          Social Activities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to Social Activities' />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
          <Button as={Link} to='/login' size='huge' inverted>
            Login!
          </Button>
        )}
        
      </Container>
    </Segment>
  )
}

export default HomePage