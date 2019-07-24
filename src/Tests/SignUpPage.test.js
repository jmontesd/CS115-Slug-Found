import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignUpPage } from '../components/SignUpPage/SignUpPage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<SignUpPage />', () => {
  it('should render error if no data entered', () => {
    // shallow render component
    const wrapper = shallow(<SignUpPage />);
    // submit form
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    // find error
    expect(wrapper.find('.alert-danger')).toHaveLength(1);
  });
  it('should call signUp when form submitted', () => {
    // mock function
    const signUp = jest.fn();
    // shalow render component and pass signUp prop
    const wrapper = shallow(<SignUpPage signUp={signUp} />);
    // add fields
    wrapper.find('#username').simulate('change', { target: { value: 'username' } });
    wrapper.find('#password').simulate('change', { target: { value: 'password' } });
    wrapper.find('#email').simulate('change', { target: { value: 'email@ucsc.edu' } });
    wrapper
      .find('input')
      .at(3)
      .simulate('change', { target: { files: [1, 2] } });
    // submit form
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    // check to see if function was called
    expect(signUp).toHaveBeenCalled();
  });
});
