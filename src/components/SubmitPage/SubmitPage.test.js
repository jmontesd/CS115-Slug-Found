import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SubmitPage } from './SubmitPage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<SubmitPage />', () => {
  const title = 'title';
  const description = 'description';
  it('should render error when no title added', () => {
    // render component with prop isLoggedIn to true
    const wrapper = shallow(<SubmitPage isLoggedIn />);
    // submit form
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    // find error
    expect(wrapper.find('.alert-danger')).toHaveLength(1);
  });
  it('should render error when no file added', () => {
    // render component with prop isLoggedIn to true
    const wrapper = shallow(<SubmitPage isLoggedIn />);
    // add title
    wrapper.find('#title').simulate('change', { target: { value: title } });
    // submit form
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.find('.alert-danger')).toHaveLength(1);
  });
  it('should render error when no description added', () => {
    // render component with prop isLoggedIn to true
    const wrapper = shallow(<SubmitPage isLoggedIn />);
    // add title
    wrapper.find('#title').simulate('change', { target: { value: title } });
    // add description
    wrapper.find('#description').simulate('change', { target: { value: description } });
    // submit form
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.find('.alert-danger')).toHaveLength(1);
  });
});
