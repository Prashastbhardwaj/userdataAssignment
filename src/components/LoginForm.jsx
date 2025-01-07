import React, { useState } from 'react';
import { TextField, Button, Container, Snackbar } from '@mui/material';
import { useNavigate , Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);
 
  const handleLogin = () => {
    const storedUser = users.find((user) => user?.email === email);
    if (storedUser) {
      if (password === storedUser.password) {
        navigate('/home');
      } else {
        setError('Invalid login credentials');
        setOpenSnackbar(true);
      }
    } else {
      setError('Invalid login credentials');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
      <h1>Login Form</h1>
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
      <p className="mt-5">
          or <Link to={"/signup"}>create a new account!</Link>
      </p>
    </Container>
  );
};

export default LoginForm;
