import axios from 'axios';

export const fetchUsers = () => {
  return async (dispatch) => {
    const usersFetched = localStorage.getItem('usersFetched');
    if (!usersFetched) {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=4&nat=us');
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data.results });
        localStorage.setItem('usersFetched', 'true');
      } catch (error) {
        dispatch({ type: 'FETCH_USERS_FAILURE', error });
      }
    }
  };
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user, 
  };
};

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

export const deleteUser = (userId) => {
  return {
    type: 'DELETE_USER',
    payload: userId,
  };
};

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user,
});

  