import React from 'react';
import './NotFoundPage.scss';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const NotFoundPage = (props) => {
  // these are the props need for this component
  const { isLoggedIn } = props;
  // redirect use to login if they are not logged in
  if (!isLoggedIn) return <Redirect to="/login" />;
  // render this to the screen
  return (
    <div className="container">
      <Link to="/">404 - Go home</Link>
    </div>
  );
};
// check to see if user is logged in
// and pass that as a prop to the component
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.firebase.auth.uid,
  };
};
// export this component with the neccessary data
export default connect(mapStateToProps)(NotFoundPage);
