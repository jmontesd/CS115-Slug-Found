import React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container">
      <Link to="/">404 - Go home</Link>
    </div>
  );
};

export default NotFoundPage;
