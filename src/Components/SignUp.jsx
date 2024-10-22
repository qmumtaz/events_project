import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { SignInWithGoogle } from './SignInWithGoogle'; 
import './Styling/signup.css'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (username.length < 6) {
      setAlertMessage('Username must be at least 6 characters long.');
      setShowAlert(true);
      return;
    }

    if (password.length < 6) {
      setAlertMessage('Password must be at least 6 characters long.');
      setShowAlert(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = email.endsWith('@eventstaff.com') ? 'staff' : 'member';

      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        role, 
      });

      alert('User signed up successfully!');
      navigate('/home'); 
    } catch (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Form onSubmit={handleSignUp}>
        <Form.Group>
          <label>Username:</label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <label>Email:</label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <label>Password:</label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <button type="submit" className="btn-custom">Sign Up</button>
      </Form>
      <Form.Text className='botttomtext'>Already have an account? Sign in</Form.Text>
      <GoogleButton onClick={SignInWithGoogle} className='googlebtn' />
    </div>
  );
};

export default SignUp;
