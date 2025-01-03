import React from 'react';
import UsersTable from '../components/UsersTable';
import FilterForm from '../components/FilterForm';

const HomePage = () => {
  return (
    <>
      <FilterForm />
      <UsersTable />
    </>
  );
};

export default HomePage;
