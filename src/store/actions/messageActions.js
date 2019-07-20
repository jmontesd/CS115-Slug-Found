// eslint-disable-next-line import/prefer-default-export
export const updateMessages = (toId, message, messageGroup) => (
  dispatch,
  getState,
  { getFirestore },
) => {
  const state = getState();
  const { uid: fromId } = state.firebase.auth;

  let smallerId;
  let greaterId;
  if (fromId > toId) {
    greaterId = fromId;
    smallerId = toId;
  } else {
    greaterId = toId;
    smallerId = fromId;
  }

  if (!messageGroup) {
    const messages = [];
    messages.push({ from: fromId, message });
    getFirestore()
      .collection('messages')
      .add({
        smallerId,
        greaterId,
        messages,
      });
  } else {
    const found = Object.keys(state.firestore.data.messages).find(
      (key) =>
        state.firestore.data.messages[key] &&
        state.firestore.data.messages[key].smallerId === smallerId &&
        state.firestore.data.messages[key].greaterId === greaterId,
    );
    messageGroup.messages.push({ from: fromId, message });
    getFirestore()
      .collection('messages')
      .doc(found)
      .update(messageGroup);
  }
};
