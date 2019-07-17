import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NotFoundPage } from './NotFoundPage';

configure({ adapter: new Adapter() });

describe('<NotFoundPage />', () => {
  it('should ', () => {
    const wrapper = shallow(<NotFoundPage />);
  });
});
