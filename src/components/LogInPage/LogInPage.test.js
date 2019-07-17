import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LogInPage } from './LogInPage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<LogInPage />', () => {
  it('should render error if no data entered', () => {
    // shallow render component
    const wrapper = shallow(<LogInPage />);
    // submit form
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    // find error
    expect(wrapper.find('.alert-danger')).toHaveLength(1);
  });
  it('should call signUp when form submitted', () => {
    // mock function
    const logIn = jest.fn();
    // shalow render component and pass logIn prop
    const wrapper = shallow(<LogInPage logIn={logIn} />);
    // add fields
    wrapper.find('#password').simulate('change', { target: { value: 'password' } });
    wrapper.find('#email').simulate('change', { target: { value: 'email@ucsc.edu' } });
    // submit form
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    // check to see if function was called
    expect(logIn).toHaveBeenCalled();
  });
});
