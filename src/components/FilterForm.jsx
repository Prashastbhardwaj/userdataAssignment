import React from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setFilter } from '../store/actions/filterActions';

const FilterForm = () => { 
  const dispatch = useDispatch();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  
  const handleSubmit = () => {
    dispatch(setFilter({ firstName, lastName, dob }));
  };

  return (
    <div>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="DOB"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={handleSubmit}>Filter</Button>
    </div>
  );
};

export default FilterForm;
