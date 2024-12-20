import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';
import { SignInWithGoogle, signOutUser } from './SignInWithGoogle'; 
import { Alert, Button, Form } from 'react-bootstrap';
import GoogleButton from 'react-google-button'
import "./Styling/login.css"


const Login = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false); 
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success'); 

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      setAlertMessage('Logged in successfully!');
      setAlertVariant('success');
      setShow(true);
    } catch (error) {
      
      setAlertMessage('Login failed. Please check your credentials.');
      setAlertVariant('danger'); 
      setShow(true)
    }
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleLogin} className="form-custom">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group >
        <Button variant="dark" type="submit">Login</Button>

        <Form.Text className='botttomtext'>Already have an account ? Sign in</Form.Text>
        <GoogleButton onClick={SignInWithGoogle} className='googlebtn' />
      </Form>


      <Alert show={show} variant={alertVariant}>
        <Alert.Heading>{alertVariant === 'success' ? 'Success!' : 'Error!'}</Alert.Heading>
        <p>{alertMessage}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="dark">
            Close me
          </Button>
        </div>
      </Alert>
      
    </>
  );
};

export default Login;
