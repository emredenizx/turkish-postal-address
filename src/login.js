import React, { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Segment, Container } from 'semantic-ui-react';
import { login } from './firebase/firebase';
import { AuthContext } from './context/auth';


const Login = () => {
    const { currentUser } = useContext(AuthContext);

    let history = useHistory();

    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser() {
        try {
            await login(email, password)
            history.replace('/')
        } catch (error) {
            alert(error.message)
        }
    }

    if (currentUser) {
        return <Redirect to='/' />
    }

    return (
        <Container>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' value={email} onChange={event => setUsername(event.target.value)} />
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' value={password} onChange={event => setPassword(event.target.value)} />
                            <Button fluid size='large' onClick={loginUser}> Login </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default Login