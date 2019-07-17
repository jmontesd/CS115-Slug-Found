import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavBar } from './NavBar';

configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
  it('should ', () => {
    const wrapper = shallow(<NavBar />);
  });
});
