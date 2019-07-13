import React from 'react';
import './Item.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Item = (props) => {
  const { post } = props;
  return (
    <div className="container">
        <div>
          <Link to={`/item/${post.id}`}>{post.title}</Link>
      </div>
      <div>{`${moment(post.createdAt).calendar()}`}</div>
      <Link to={`/item/${post.id}`}>
        <img alt="item" src={post.imageURL} />
      </Link>
      <button class="button"> Delete  </button>
      <button class="button"> Message  </button>
    </div>
  );
};

export default Item; 
