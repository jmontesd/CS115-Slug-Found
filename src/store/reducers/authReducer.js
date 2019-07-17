// initial state
const initState = {
  loginError: null,
  signUpError: null,
  resetPasswordSuccessMessage: null,
};
// messages to show user in the event of error or success
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        // sets error message if theres error during logging in
        loginError: 'Login failed',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        // removes error message
        loginError: null,
      };
    case 'SIGNOUT_SUCCESS':
      return state;
    case 'SIGNOUT_ERROR':
      return state;
    case 'SIGNUP_ERROR':
      return {
        ...state,
        // gets the error message from firebase and shows it to user
        signUpError: action.err.message,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        // clears the error message
        signUpError: null,
      };
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        // lets the user know the password reset was successful
        resetPasswordSuccessMessage: 'Success',
      };
    default:
      return state;
  }
};

export default authReducer;
