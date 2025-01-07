import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers , deleteUser , updateUser } from '../store/actions/userActions';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import FilterForm from './FilterForm';
import { clearUser } from '../store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const UsersTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const users = useSelector((state) => state.user.users); 
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users); 
    }
  }, [users]);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('usersFetched');
    navigate('/'); 
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId)); 
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setEditUser(null);
  };

  const handleSaveEdit = () => {
    dispatch(updateUser(editUser));
    setFilteredUsers(
      filteredUsers.map((user) => (user.email === editUser.email ? editUser : user))
    );
    handleCloseDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'first' || name === 'last') {
      setEditUser((prevUser) => ({
        ...prevUser,
        name: {
          ...prevUser.name,
          [name]: value,
        },
      }));
    }
    else if (name === 'dob') {
      const formattedDate = new Date(value).toISOString().split('T')[0]; 
      setEditUser((prevUser) => ({
        ...prevUser,
        dob: {
          ...prevUser.dob,
          date: formattedDate,
        },
      }));
    }
    else {
      setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  return (
    <>
      <LanguageSwitcher /> 
      <FilterForm users={users} setFilteredUsers={setFilteredUsers} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('first_name')}</TableCell> 
              <TableCell>{t('last_name')}</TableCell> 
              <TableCell>{t('email')}</TableCell> 
              <TableCell>{t('dob')}</TableCell> 
              <TableCell>{t('actions')}</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user?.name?.first || 'N/A'}</TableCell>
                  <TableCell>{user?.name?.last || 'N/A'}</TableCell>
                  <TableCell>{user?.email || 'N/A'}</TableCell>
                  <TableCell>{user?.dob?.date ? new Date(user.dob.date).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)} variant="contained" color="primary">Edit</Button> 
                    <Button onClick={() => handleDelete(user.email)} variant="contained" color="secondary">Delete</Button> 
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No Users Available</TableCell> 
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleLogout} variant="contained" color="secondary">
        LOGOUT
      </Button> 

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit user</DialogTitle> 
        <DialogContent>
          <TextField
            label="First Name"
            name="first"
            value={editUser?.name?.first || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="last"
            value={editUser?.name?.last || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editUser?.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Date Of Birth"
            name="dob"
            type="date"
            value={editUser?.dob?.date || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button> 
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button> 
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersTable;
