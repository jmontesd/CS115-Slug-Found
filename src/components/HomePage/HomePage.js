import React from 'react';
import './HomePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import M from 'materialize-css';
import SearchBox from '../SearchBox/SearchBox';
import Item from '../Item/Item';

export class HomePage extends React.Component {
  // get a reference to the element after the component has mounted
  // componentDidMount() {
  //   M.Sidenav.init(this.sidenav);
  //   M.Collapsible.init(this.collapsible);
  // }
  state = {
    searchItem: '',
  };

  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({ searchItem: e.target.value });
  };

  render() {
    const { posts, isLoggedIn } = this.props;

    if (!isLoggedIn) return <Redirect to="/login" />;

    return (
      <div className="container" id="body">
        <SearchBox handleInput={this.handleInput} />
        <div className="HomePage-container">
          {posts &&
            posts
              .slice()
              .sort((a, b) => b.createdAt - a.createdAt)
              .filter((post) => {
                return post.title.toLowerCase().includes(this.state.searchItem.toLowerCase());
              })
              .map((post) => <Item key={post.id} post={post} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // get all posts from firebase
  const { posts } = state.firestore.ordered;
  return {
    posts,
    isLoggedIn: state.firebase.auth.uid,
  };
};
// export this component with the neccessary data
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts' }]),
)(HomePage);
