import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SubmitPage } from './SubmitPage';

configure({ adapter: new Adapter() });

describe('<SubmitPage />', () => {
  it('should ', () => {
    const wrapper = shallow(<SubmitPage />);
  });
});
