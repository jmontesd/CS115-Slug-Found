import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProfilePage } from '../components/ProfilePage/ProfilePage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<ProfilePage />', () => {
  it('should render ProfilePage properly', () => {
    // test creates snapshot of component and checks if matches
    // previously create snapshot
    const wrapper = shallow(<ProfilePage isLoggedIn username="username" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render updateProfileImage properly', () => {
    // mock function
    const updateProfileImage = jest.fn();
    const wrapper = shallow(
      <ProfilePage
        isLoggedIn
        isUserProfileTheUserLoggedIn
        updateProfileImage={updateProfileImage}
      />,
    );
    // simulate adding file
    wrapper.find('input').simulate('change', { target: { files: [1, 2] } });
    // check if mock function was called
    expect(updateProfileImage).toHaveBeenCalled();
  });
});
