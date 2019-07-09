const postsReducerDefaultState = [];

export default (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST_SUCCESS':
      return state;
    case 'ADD_POST_ERROR':
      return state;
    case 'EDIT_POST_SUCCESS':
      return state;
    case 'EDIT_POST_ERROR':
      return state;
    case 'REMOVE_POST_SUCCESS':
      return state;
    case 'REMOVE_POST_ERROR':
      return state;
    default:
      return state;
  }
};
