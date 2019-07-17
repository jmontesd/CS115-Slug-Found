import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProfilePage } from './ProfilePage';

configure({ adapter: new Adapter() });

describe('<ProfilePage />', () => {
  it('should ', () => {
    const wrapper = shallow(<ProfilePage />);
  });
});
