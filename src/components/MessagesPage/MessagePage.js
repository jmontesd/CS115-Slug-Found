import React from 'react';
import './MessagesPage.scss';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import uuid from 'uuid';
import { updateMessages as updateMessagesAction } from '../../store/actions/messageActions';

class MessagesPage extends React.Component {
  state = { message: '' };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  // message send handler
  handleMessageSend = () => {
    const { updateMessages, toId, messageGroup } = this.props;
    const { message } = this.state;
    updateMessages(toId, message, messageGroup);
  };

  // render message to left or right depending who sent
  renderMessage = (m) => {
    const { toId } = this.props;
    let messageColor = 'orange';
    if (m.from === toId) {
      messageColor = 'blue';
    }
    return (
      <div className={`message-${messageColor}`} key={uuid()}>
        <p className="message-content">{m.message}</p>
      </div>
    );
  };

  render() {
    // necessary props
    const { toUserName, isLoggedIn, messageGroup, toId } = this.props;
    // use to store message
    // if user not logged in, redirect
    if (!isLoggedIn) return <Redirect to="/login" />;
    // render html
    return (
      <div className="auth-wrapper mb-2">
        <Link to={`/profile/${toId}`}>{toUserName}</Link>
        <div className="messages-container">
          {messageGroup && messageGroup.messages.map((m) => this.renderMessage(m))}
          <div
            ref={(e) => {
              this.messagesEnd = e;
            }}
          />
        </div>
        <div className="d-flex">
          <input onChange={(e) => this.setState({ message: e.target.value })} />
          <button className="btn btn-secondary" type="button" onClick={this.handleMessageSend}>
            Send
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  // get id of to
  const { id: toId } = props.match.params;
  // get all messages
  const { messages: allMessageGroups, users } = state.firestore.ordered;
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
  // find user
  const user = users && users.find((u) => u.id === toId);
  // get their username
  const toUserName = user && user.username;
  console.log(users);
  return {
    toUserName,
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
  firestoreConnect([{ collection: 'messages' }, { collection: 'users' }]),
)(MessagesPage);
