import axios from 'axios';
export const fetchUsers = () => {
    
    return async (dispatch) => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=10&nat=us');
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_USERS_FAILURE', error });
      }
    };
  };
  

  