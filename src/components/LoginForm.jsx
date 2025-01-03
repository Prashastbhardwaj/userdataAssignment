import React, { useState } from 'react';
import { TextField, Button, Container, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'user@gmail.com' && password === 'password') {
      navigate('/home');
    } else {
      setError('Invalid login credentials');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
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
      <Button onClick={handleLogin} variant="contained" fullWidth>
        Login
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
    </Container>
  );
};

export default LoginForm;
