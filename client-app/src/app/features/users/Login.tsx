import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button, Container, Header } from "semantic-ui-react";

const Login = () => {
  
  const [showRegister, setShowRegister] = useState(false);
  
  function handleRegister() {

    setShowRegister(!showRegister);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          position: 'relative'
        }}
      >
          <Container style={{position: 'fixed', top: '0', padding: '10px 5px'}}>
            <Button basic content="Be a Member" floated="right" onClick={handleRegister}/>
          </Container>
        
        {showRegister ? (
          <RegisterForm cardProps={{ style: { width: 600 } }} header="Register" />
          ) : (
          <LoginForm cardProps={{ style: { width: 400 } }} header="Log in" />
        )}
      </div>
    </>
  );
};

export default Login;
