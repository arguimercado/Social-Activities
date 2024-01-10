import { Formik,Form, FormikHelpers, ErrorMessage } from "formik";
import { useState } from "react";
import { Button, Card, Label } from "semantic-ui-react";
import { UserFormValues } from "../../models/User";
import { CstTextInput } from "../../components";
import { useStore } from "../../stores/store";

interface Props {
  header?: string;
  cardProps: {};
}

const RegisterForm = ({ header, cardProps }: Props) => {
  const {userStore: {register}} = useStore()

  const [userRegister,setUserRegister] = useState<UserFormValues>({
    email: "",
    password: "",
    username: "",
    displayname: "",
    confirmPassword: ""
  });

  function handleFormSubmit(user: UserFormValues,{setErrors}) {
    register(user)
      .catch(error => setErrors({error: "Invalid email or password!!"}))
  }

  return (
    <Card {...cardProps}>
      <Card.Header
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          padding: 5,
        }}
      >
        {header}
      </Card.Header>
      <Card.Content>
        <Formik 
          enableReinitialize
          initialValues={userRegister}
          onSubmit={(user,{setErrors}) => register(user).catch(er => setErrors({error: "Registration Failed!!!"}))}
        >
          {({handleSubmit,isSubmitting,errors}) => {
           
            return (
              <Form className="ui form" onSubmit={handleSubmit}>
                <CstTextInput label="User Name" name="username" placeholder="Enter user name i.e bob..." />
                <CstTextInput label="Display Name" name="displayname" placeholder="Enter Display Name" />
                <CstTextInput label="Email" type="email" name="email" placeholder="Enter Email Address" />
                <CstTextInput label="Password" type="password" name="password" placeholder="Enter Password" />
                <CstTextInput label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm Password" />
                <ErrorMessage
                              name='error' render={() => 
                                  <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}/>
                <Button positive loading={isSubmitting} content='Register' type='submit' fluid /> 
              </Form>
            )
          }}
        </Formik>
      </Card.Content>
    </Card>
  );
};

export default RegisterForm;
