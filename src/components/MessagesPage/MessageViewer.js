import React from 'react';
import './MessagesPage.scss';
import uuid from 'uuid';
import moment from 'moment';

export default class MessageViewer extends React.Component {
  state = { message: '' };

  // scroll to bottom once component mounts
  componentDidMount() {
    this.scrollToBottom();
  }

  // scroll to bottom once component updates
  componentDidUpdate() {
    this.scrollToBottom();
  }

  // scroll to bottom function
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'auto' });
  };

  // message send handler
  handleMessageSend = (e) => {
    e.preventDefault();
    const { updateMessages, toId, messageGroup } = this.props;
    const { message } = this.state;
    updateMessages(toId, message, messageGroup);
    this.setState({ message: '' });
  };

  // render message to left or right depending who sent
  // and give color
  renderMessage = (message) => {
    const { toId } = this.props;
    let color = 'orange';
    let direction = 'right';
    if (message.from === toId) {
      color = 'blue';
      direction = 'left';
    }
    return (
      <div className={`message-${color}`} key={uuid()}>
        <p className="message-content">{message.message}</p>
        <div className={`message-timestamp-${direction}`}>
          {moment(message.timestamp).calendar()}
        </div>
      </div>
    );
  };

  render() {
    // necessary props
    const { messageGroup } = this.props;
    const { message } = this.state;
    // render html
    return (
      <>
        <div className="MessageViewer-container">
          {messageGroup && messageGroup.messages.map((m) => this.renderMessage(m))}
          <div
            ref={(e) => {
              this.messagesEnd = e;
            }}
          />
        </div>
        <form
          className="MessageViewer-message-input-and-send"
          onSubmit={(e) => this.handleMessageSend(e)}
        >
          <input
            className="MessageViewer-message-input"
            value={message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <button className="btn btn-secondary MessageViewer-message-button" type="submit">
            Send
          </button>
        </form>
      </>
    );
  }
}
