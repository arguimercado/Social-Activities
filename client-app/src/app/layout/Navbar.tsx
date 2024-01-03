import { Button, Container, Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom";


const Navbar = () => {
 

  return (
    <Menu inverted fixed="top">
        <Container>
            <Menu.Item as={NavLink} to='/' header>
                <div style={{display:'flex',gap: '10px',alignItems:'center'}}>
                  <img src="/assets/logo.png" style={{height:'35px'}} alt="logo"/>
                  <span>Social Activities</span>
                </div>
            </Menu.Item>
            <Menu.Item as={NavLink} to='/activities' name="Activities" />
            <Menu.Item>
                <Button positive content='Create Activity' as={NavLink} to='/create'/>
            </Menu.Item>        
            </Container>
    </Menu>
  )
}

export default Navbar