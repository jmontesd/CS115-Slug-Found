import React from 'react';
import './Item.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const Item = (props) => {
  // get the post from props
  const { post } = props;
  // render this as html
  return (
    <div id="post">
      <div className="postText">
        <Link to={`/item/${post.id}`}>{post.title}</Link>
      </div>
      <div className=".text"> {`${moment(post.createdAt).calendar()}`} </div>
      <Link to={`/item/${post.id}`}>
        <img className="item-image" alt="item" src={post.imageURL} />
      </Link>
      {/* do only for personal posts */}
      <div className="divider" />
      {/* <button className="button" id="messageBtn"> Message </button> */
      /* add only for item page */}
    </div>
  );
};

export default Item;
