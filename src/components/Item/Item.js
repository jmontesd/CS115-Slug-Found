import React from 'react';
import './Item.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Item = (props) => {
  const { post } = props;
  return (
    <div className="container">
      <div>{`${moment(post.createdAt).calendar()}`}</div>
      <div>
        <Link to={`/item/${post.id}`}>{post.title}</Link>
      </div>
      <Link to={`/item/${post.id}`}>
        <img alt="item" src={post.imageURL} id="test"/>
      </Link>
    </div>
  );
};

export default Item;
