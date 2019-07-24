import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchBox } from './SearchBox';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<SearchBox />', () => {
  it('', () => {
    // mock function
    const handleInput = jest.fn();
    // shalow render component and pass handleInput prop
    const wrapper = shallow(<SearchBox handleInput={handleInput} />);
    // add fields
    wrapper.find('#search-box').simulate('change', { target: { value: 'text' } });
    // check to see if function was called
    expect(handleInput).toHaveBeenCalledWith({ target: { value: 'text' } });
  });
});
