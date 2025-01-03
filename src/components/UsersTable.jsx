import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions/userActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users.results);
 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>DOB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
         {Array.isArray(users) && users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name.first}</TableCell>
                <TableCell>{user.name.last}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.dob.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No users available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
