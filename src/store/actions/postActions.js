export const addPost = (post) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const { uid } = getState().firebase.auth;
  if (uid) {
    firestore
      .collection('posts')
      .add({
        ...post,
        createdAt: Date.now(),
        user: { name: getState().firebase.profile.username, id: uid },
      })
      .then(() => {
        dispatch({ type: 'ADD_POST_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_POST_ERROR', err });
      });
  }
};

export const editPost = (postId, updatedPost) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const { uid } = getState().firebase.auth;
  const postToAdd = {};
  const postData = { ...updatedPost };
  postData.id = postId;
  postToAdd[postId] = postData;
  if (uid) {
    firestore
      .collection('posts')
      .doc(uid)
      .update({ ...postToAdd })
      .then(() => dispatch({ type: 'EDIT_POST_SUCCESS' }))
      .catch((err) => {
        dispatch({ type: 'EDIT_POST_ERROR', err });
      });
  }
};

export const removePost = (postId) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const { uid } = getState().firebase.auth;
  const postToDelete = {};
  postToDelete[postId] = firestore.FieldValue.delete();
  if (uid) {
    firestore
      .collection('post')
      .doc(uid)
      .update(postToDelete)
      .then(() => dispatch({ type: 'REMOVE_POST_SUCCESS' }))
      .catch((err) => {
        dispatch({ type: 'REMOVE_POST_ERROR', err });
      });
  }
};
