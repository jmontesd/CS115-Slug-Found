// eslint-disable-next-line import/prefer-default-export
export const updateMessages = (toId, message, messageGroup) => (
  dispatch,
  getState,
  { getFirestore },
) => {
  const state = getState();
  // get current user id
  const { uid: fromId } = state.firebase.auth;

  // used to create only one group id
  let smallerId;
  let greaterId;
  if (fromId > toId) {
    greaterId = fromId;
    smallerId = toId;
  } else {
    greaterId = toId;
    smallerId = fromId;
  }

  // if there is no message groups current, create one
  if (!messageGroup) {
    const messages = [];
    messages.push({ from: fromId, message });
    // push message to firestore
    getFirestore()
      .collection('messages')
      .add({
        smallerId,
        greaterId,
        messages,
      });
  } else {
    // find docId to update messages
    const allMessageGroups = state.firestore.data.messages;
    const docId = Object.keys().find(
      (key) =>
        allMessageGroups[key] &&
        allMessageGroups[key].smallerId === smallerId &&
        allMessageGroups[key].greaterId === greaterId,
    );
    // add message
    messageGroup.messages.push({ from: fromId, message });
    // push to firestore
    getFirestore()
      .collection('messages')
      .doc(docId)
      .update(messageGroup);
  }
};
