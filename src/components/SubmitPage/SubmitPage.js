import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './SubmitPage.scss';
import { connect } from 'react-redux';
import { uploadImage as uploadImageAction } from '../../firebase/firebase';
import { addPost as addPostAction } from '../../store/actions/postActions';

export const SubmitPage = (props) => {
  // these are the props need for this component
  const { addPost, isLoggedIn, uploadImage } = props;
  // vars needed for this component
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  // redirect use to login if they are not logged in
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  // once item submitted, redirect user
  if (redirect) {
    return <Redirect to={`/item/${redirect}`} />;
  }
  // this is used to handle when user uploads image
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageFile(image);
    }
  };
  // make sure user submitted valid data
  const validateForm = () => {
    if (!title || !title.trim()) {
      setError('Please enter a title.');
      return false;
    }
    if (!description || !description.trim()) {
      setError('Please enter a description');
      return false;
    }
    if (!imageFile) {
      setError('Please enter an image');
      return false;
    }
    if (!location.trim()) {
      setError('Please enter a Location');
      return false;
    }
    return true;
  };
  // when user hits submmit
  const onSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    // only submits if user submits valid data
    if (validateForm()) {
      setError('');
      // upload the image and then add the post to firebase
      // then redirect to that image
      uploadImage(imageFile, (id, imageURL) => {
        addPost({ id, title, description, location, imageURL });
        setRedirect(id);
      });
    }
  };
  // render this to the screen
  return (
    <div className="container">
      {/* onSubmit is called when form submitted */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="title"
            aria-describedby="titleHelp"
            placeholder="Enter title"
            value={title}
            // set the title var if user changes
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
            // set the description var if user changes
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            aria-describedby="locationHelp"
            placeholder="Enter Location"
            value={location}
            // set the location var if user changes
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* call handleFileChange when user changes file */}
        <div className="d-flex justify-content-between">
          <div>
            <label className="btn btn-outline-info cursor-pointer">
              <input className="d-none" type="file" onChange={handleFileChange} />
              Choose File
            </label>
            {/* if there is an imageFile, render the name to screen */}
            <span>{imageFile && imageFile.name}</span>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
        {/* if there is an error, render it, otherwise render nothing */}
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
      </form>
    </div>
  );
};
// check to see if user is logged in
// and pass that as a prop to the component
const mapStateToProps = (state) => ({
  isLoggedIn: state.firebase.auth.uid,
});
// get the addPost function which will addPost to firebase
const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(addPostAction(post)),
  uploadImage: uploadImageAction,
});
// export this component with the neccessary data
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitPage);
