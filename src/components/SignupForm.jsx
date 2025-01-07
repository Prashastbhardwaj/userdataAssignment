import React, { useState } from 'react';
import { TextField, Button, Container, Snackbar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser  } from '../store/actions/userActions';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const handleSignup = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setOpenSnackbar(true);
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      setOpenSnackbar(true);
      return;
    }
    if (password.length < 2) {
      setError('Password must be at least 8 characters long');
      setOpenSnackbar(true);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setOpenSnackbar(true);
      return;
    }
    const user = { firstName, lastName, email, password };
    dispatch(setUser(user));
    navigate('/');
  };

  return ( 
    <Container>
      <h1>Signup Form</h1>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSignup} variant="contained" fullWidth>
        Sign Up
      </Button>
      <Snackbar
        ContentProps={{
          sx: {
            background: "red"
          }
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        message={error}
        onClose={() => setOpenSnackbar(false)}
      />
      <p className="mt-5">
        Already have an account? <Link to={"/"}>Login here</Link>
      </p>
    </Container>
  );
};

export default SignupForm;
