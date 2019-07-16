const initState = {
  authError: null,
  resetPasswordSuccessMessage: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
      };
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNOUT_ERROR':
      return state;
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null,
      };

    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message,
      };
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        resetPasswordSuccessMessage: 'Success',
      };
    default:
      return state;
  }
};

export default authReducer;
