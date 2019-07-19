// action to add post
export const addPost = (post) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  // gets the user id of the user currently logged in
  const { uid } = getState().firebase.auth;
  // makes sure there is a user logged in
  if (uid) {
    // adds post to firebase
    firestore.collection('posts').add({
      ...post,
      createdAt: Date.now(),
      user: { name: getState().firebase.profile.username, id: uid },
    });
  }
};
export const deletePost = (postId, firebasePostId) => (dispatch, getState, { getFirestore }) => {
  getFirestore().delete({ collection: 'posts', doc: postId });
  getFirestore().delete({ collection: 'posts', doc: firebasePostId });
};
