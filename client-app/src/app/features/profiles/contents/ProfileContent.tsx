import { Tab } from "semantic-ui-react"
import ProfilePhotos from "./photos/ProfilePhotos";
import ProfileAbout from "./about/ProfileAbout";



const ProfileContent = () => {
  const panes = [
    { menuItem: 'About', render: () => <ProfileAbout /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos /> },
    { menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers Content</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following Content</Tab.Pane> },
  ]
  return (
    <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition="right"
      panes={panes}
    ></Tab>
  )
}

export default ProfileContent


