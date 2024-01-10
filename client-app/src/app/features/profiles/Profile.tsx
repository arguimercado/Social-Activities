import { Grid, Segment,Image, Card } from "semantic-ui-react";

const Profile = () => {
  return (
    <Grid>
      <Grid.Column width={4}>
				<Segment basic>
					<Image src="/assets/user.png" />
				</Segment>
			</Grid.Column>
			<Grid.Column width={12}>
				<Card fluid>
					<Card.Content>
						
					</Card.Content>
				</Card>
			</Grid.Column>
    </Grid>
  );
};

export default Profile;
