import React from 'react';
import './Item.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const Item = (props) => {
  // get the post from props
  const { post } = props;
  // render this as html
  return (
    <div className="container">
      <div>{`${moment(post.createdAt).calendar()}`}</div>
      <div>
        <Link to={`/item/${post.id}`}>{post.title}</Link>
      </div>
      <Link to={`/item/${post.id}`}>
        <img alt="item" src={post.imageURL} />
      </Link>
    </div>
  );
};

export default Item;
