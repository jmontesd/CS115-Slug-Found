import React from 'react';
import './MessagesPage.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import uuid from 'uuid';
import { updateMessages as updateMessagesAction } from '../../store/actions/messageActions';

const MessagesPage = (props) => {
  const { isLoggedIn, messageGroup, updateMessages, toId } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  const handleMessageSend = () => {
    updateMessages(toId, 'message', messageGroup);
  };

  return (
    <div className="container">
      {messageGroup &&
        messageGroup.messages.map((message) => (
          <div key={uuid()}>{`from${message.from}  message${message.message}`}</div>
        ))}
      <input />
      <button type="button" onClick={handleMessageSend}>
        Send
      </button>
    </div>
  );
};
const mapStateToProps = (state, props) => {
  const { id: toId } = props.match.params;
  const { messages: allMessageGroups } = state.firestore.ordered;
  const fromId = state.firebase.auth.uid;

  let smallerId;
  let greaterId;
  if (fromId > toId) {
    greaterId = fromId;
    smallerId = toId;
  } else {
    greaterId = toId;
    smallerId = fromId;
  }

  const messageGroup =
    allMessageGroups &&
    allMessageGroups.find((m) => m.smallerId === smallerId && m.greaterId === greaterId);

  return {
    messageGroup,
    toId,
    fromId,
    isLoggedIn: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateMessages: (toId, message, messageGroup) =>
    dispatch(updateMessagesAction(toId, message, messageGroup)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'messages' }]),
)(MessagesPage);
