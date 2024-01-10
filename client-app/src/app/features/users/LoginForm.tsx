import { ErrorMessage, Form, Formik } from 'formik'
import { CstTextInput } from '../../components'
import { Button, Card, Label } from 'semantic-ui-react'
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

interface Props  {
    header?: string,
    cardProps: {}
}

const LoginForm = ({header,cardProps} : Props) => {

    const {userStore: {login}} = useStore();

  return (
    <Card {...cardProps}>
        <Card.Header style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20, padding: 5}}>{header}</Card.Header>
        <Card.Content>

                <Formik
                enableReinitialize
                initialValues={{email: '', password: '',error: null}}
                onSubmit={(values, {setErrors}) => login(values).catch(error => 
                    setErrors({error: "Invalid email or password!!"})) }
            >
                {({handleSubmit,isSubmitting,errors}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <CstTextInput name='email' placeholder='Email' />
                        <CstTextInput name='password' placeholder='Password' type='password' />
                        <ErrorMessage
                            name='error' render={() => 
                                <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
                        />
                        <Button positive loading={isSubmitting} content='Login' type='submit' fluid />
                    </Form>
                )}
            </Formik>
        </Card.Content>

    </Card>
   
)
}

export default observer(LoginForm)