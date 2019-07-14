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
  <input type="text" id="usrName" value="e-mail"></input>
  <div className="to">
    Subject:
  </div>
  <input type="text" id="subjct" value=""></input>
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
