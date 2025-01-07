import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

  const FilterForm = ({ setFilteredUsers, users }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    
    const handleFilter = () => {
      let filtered = [...users]; 
      if (firstName) {
        filtered = filtered.filter(user => user.name.first.toLowerCase().includes(firstName.toLowerCase()));
      }
      if (lastName) {
        filtered = filtered.filter(user => user.name.last.toLowerCase().includes(lastName.toLowerCase()));
      }
      if (dob) {
        filtered = filtered.filter(user => new Date(user.dob.date).toLocaleDateString() === new Date(dob).toLocaleDateString());
      }
      setFilteredUsers(filtered); 
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
        <Button onClick={handleFilter}>Filter</Button>
      </div>
    );
  };

export default FilterForm;
