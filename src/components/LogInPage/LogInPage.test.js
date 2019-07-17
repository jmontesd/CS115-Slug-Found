import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LogInPage } from './LogInPage';

configure({ adapter: new Adapter() });

describe('<LogInPage />', () => {
  it('should ', () => {
    const wrapper = shallow(<LogInPage />);
  });
});
