import { useEffect, useState } from 'react'
import axios from 'axios'
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    async function getAsync() {
      var response = await axios.get('http://localhost:5000/api/activities');
      setActivities(response.data);
    }
    
    getAsync();
  },[])

  return (
    <div>
      <Header as="h2" icon="user" />
      <List>
        {activities.map((activity : any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}

      </List>
    </div>
  )
}

export default App
