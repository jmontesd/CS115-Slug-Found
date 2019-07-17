import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUpPage } from './SignUpPage';

configure({ adapter: new Adapter() });

describe('<SignUpPage />', () => {
  it('should ', () => {
    const wrapper = shallow(<SignUpPage />);
  });
});
