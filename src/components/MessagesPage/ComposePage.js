import React from 'react';
import './MessagesPage.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const MessagesPage = (props) => {
  const { isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return <div className="container">
  <h1>Send A Private Message</h1>
  <div className="to">
    To:
  </div>
  <textarea name="receiver" id="usrname" rows="1" cols="30"></textarea>
  <div className="to">
    Subject:
  </div>
  <textarea name="subject" rows="1" cols="40"></textarea>
  <div className="to">
    Message:
  </div>
  <textarea name="message" rows="10" cols="80"></textarea>
  <div className="sub">
    <input type="submit" value="Send"></input>
  </div>
</div>


};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(MessagesPage);
