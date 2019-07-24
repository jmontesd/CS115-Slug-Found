import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavBar } from '../components/NavBar/NavBar';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
  it('should NavBar properly when logged in', () => {
    // test creates snapshot of component and checks if matches
    // previously create snapshot
    const wrapper = shallow(<NavBar isLoggedIn />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should NavBar properly when not logged in', () => {
    // test creates snapshot of component and checks if matches
    // previously create snapshot
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
