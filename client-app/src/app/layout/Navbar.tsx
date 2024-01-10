import { Container, Menu,Image, Dropdown, DropdownMenu, DropdownItem, DropdownDivider } from "semantic-ui-react"
import { NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";


const Navbar = () => {
 
 const {userStore : {user,logout}} = useStore();


  
  return (
    <Menu inverted fixed="top">
        <Container>
            <Menu.Item as={NavLink} to='/activities' header>
                <div style={{display:'flex',gap: '10px',alignItems:'center'}}>
                  <img src="/assets/logo.png" style={{height:'35px'}} alt="logo"/>
                  <span>Social Activities</span>
                </div>
            </Menu.Item>
            <Menu.Item as={NavLink} to='/errors' name="Errors" />

           
            <Menu.Item position='right'>
              <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />

              <Dropdown pointing='top left'  text={`${user?.displayname}`}>
                <DropdownMenu>
                  <DropdownItem as={Link} to='/create' text='Create Activity' icon="plus" />
                  <DropdownItem as={Link} to={`/profile/${user?.username}`} text='My Profile' icon="user" />
                  <DropdownDivider/>
                  <DropdownItem onClick={logout} text='Logout' icon="power" />
                </DropdownMenu>
              </Dropdown>
            </Menu.Item>        
            </Container>
    </Menu>
  )
}

export default observer(Navbar)