import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './SubmitPage.scss';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { storage } from '../../firebase/firebase';
import { addPost as addPostAction } from '../../store/actions/postActions';

const SubmitPage = (props) => {
  const { addPost, isLoggedIn } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  if (redirect) {
    return <Redirect to={`/item/${redirect}`} />;
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageFile(image);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a title.');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }
    if (!imageFile) {
      setError('Please enter an image');
      return;
    }
    setError('');

    const id = uuid();
    const uploadTask = storage.ref(`images/${id}`).put(imageFile);

    uploadTask.on(
      'state_changed',
      () => {
        // progrss function ....
      },
      () => {
        // error function ....
      },
      () => {
        // complete function ....
        storage
          .ref('images')
          .child(id)
          .getDownloadURL()
          .then((imageURL) => {
            addPost({ id, title, description, imageURL });
            setRedirect(id);
          });
      },
    );
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="title"
            aria-describedby="titleHelp"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            aria-describedby="descriptionHelp"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input type="file" onChange={handleChange} />
        <button type="submit">Submit</button>
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
      </form>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(addPostAction(post)),
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.firebase.auth.uid,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitPage);
