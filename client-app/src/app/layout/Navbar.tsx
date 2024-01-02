import { Button, Container, Menu } from "semantic-ui-react"

interface Props {
  onCreate: () => void
}

const Navbar = ({onCreate} : Props) => {
  return (
    <Menu inverted fixed="top">
        <Container>
            <Menu.Item header>
                <div style={{display:'flex',gap: '10px',alignItems:'center'}}>
                  <img src="/assets/logo.png" style={{height:'35px'}} alt="logo"/>
                  <span>Social Activities</span>
                </div>
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
                <Button positive content='Create' onClick={onCreate}/>
            </Menu.Item>        
            </Container>
    </Menu>
  )
}

export default Navbar