import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HomePage } from './HomePage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<HomePage />', () => {
  it('should ', () => {
    const wrapper = shallow(<HomePage isLoggedIn />);
  });
});
