import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { SignInWithGoogle } from './SignInWithGoogle'; 
import './Styling/signup.css'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

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
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSignUp}>
      <Form.Group>
          <label>Username:</label>
          <Form.Control
            type="username"
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
      <Form.Text className='botttomtext'>Already have an account ? Sign in</Form.Text>
      <GoogleButton onClick={SignInWithGoogle} className='googlebtn' />
    </div>
  );
};

export default SignUp;
