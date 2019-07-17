const initState = {
  loginError: null,
  signUpError: null,
  resetPasswordSuccessMessage: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: 'Login failed',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loginError: null,
      };
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNOUT_ERROR':
      return state;
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        signUpError: null,
      };

    case 'SIGNUP_ERROR':
      return {
        ...state,
        signUpError: action.err.message,
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
