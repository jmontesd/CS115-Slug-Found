import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ResetPage } from '../components/ResetPage/ResetPage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<ResetPage />', () => {
  it('should render error when no emailed entered', () => {
    const wrapper = shallow(<ResetPage />);
    // find elements just like in CSS
    // find html element <form>...</form> using 'form'
    // simulate('submit') calls onSubmit()
    // second argument is value e passed into function onSubmit(e),
    // so e = { preventDefault() {} } because we need this e.preventDefault()
    // is called in onSubmit function, without it, we will get error
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    // to find elements by className, use '.btn', note the '.' which is used to select elements
    // by className in CSS
    // we expect to find one element with className '.alert-danger'
    expect(wrapper.find('.alert-danger')).toHaveLength(1);
  });

  it('should call resetPassword when emailed entered and form submitted', () => {
    // we are mocking a function because we will test that it is called
    const resetPassword = jest.fn();
    // we pass it in as a prop into ResetPage
    const wrapper = shallow(<ResetPage resetPassword={resetPassword} />);
    const email = 'asdf@gmail.com';
    // we find <input /> on call onChange(e) with e = { target: { value: email } }
    wrapper.find('input').simulate('change', { target: { value: email } });
    // we find <form></form> on call onSubmit(e) with e = { preventDefault() {} }
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    // we make sure our mock function is called
    expect(resetPassword).toHaveBeenCalledWith(email);
  });

  it('should render resetPasswordError', () => {
    // create component with error
    const wrapper = shallow(<ResetPage resetPasswordError="error" />);
    // check to see if error found
    expect(wrapper.find('.alert-danger')).toHaveLength(1);
  });
});
