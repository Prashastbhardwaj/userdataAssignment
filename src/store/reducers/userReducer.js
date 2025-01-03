const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USERS_SUCCESS':
        return { ...state, users: action.payload, loading: false };
      case 'FETCH_USERS_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  