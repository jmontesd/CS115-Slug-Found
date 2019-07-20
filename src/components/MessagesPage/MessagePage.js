import React from 'react';
import './MessagesPage.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import uuid from 'uuid';
import { updateMessages as updateMessagesAction } from '../../store/actions/messageActions';

const MessagesPage = (props) => {
  // necessary props
  const { isLoggedIn, messageGroup, updateMessages, toId } = props;
  // if user not logged in, redirect
  if (!isLoggedIn) return <Redirect to="/login" />;
  // message send handler
  const handleMessageSend = () => {
    updateMessages(toId, 'message', messageGroup);
  };
  // render html
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
  // get id of to
  const { id: toId } = props.match.params;
  // get all messages
  const { messages: allMessageGroups } = state.firestore.ordered;
  // get id of sender
  const fromId = state.firebase.auth.uid;
  // use to distinguish between message groups
  let smallerId;
  let greaterId;
  if (fromId > toId) {
    greaterId = fromId;
    smallerId = toId;
  } else {
    greaterId = toId;
    smallerId = fromId;
  }
  // find the message group
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
// get update message functions
const mapDispatchToProps = (dispatch) => ({
  updateMessages: (toId, message, messageGroup) =>
    dispatch(updateMessagesAction(toId, message, messageGroup)),
});
// connect and export
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'messages' }]),
)(MessagesPage);
