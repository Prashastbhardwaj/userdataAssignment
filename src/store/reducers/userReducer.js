const initialState = {
  users: [],
  loading: false,
  error: null,
  user: null, 
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
      };
    case 'CLEAR_USER':
      return { 
        ...state, 
        user: null, 
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.email !== action.payload), 
      };
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_USERS_SUCCESS':
      return { 
        ...state, 
        users: action.payload, 
        loading: false 
      };
    case 'FETCH_USERS_FAILURE':
      return { 
        ...state, 
        error: action.error, 
        loading: false 
      };
    case 'UPDATE_USER':
    return {
      ...state,
      users: state.users.map((user) =>
        user.email === action.payload.email ? action.payload : user
      ),
    };
    default:
      return state;
  }
};
