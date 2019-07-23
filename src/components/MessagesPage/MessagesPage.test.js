import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MessagesPage } from './MessagesPage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<MessagesPage />', () => {
  it('should render MessagesPage properly', () => {
    const wrapper = shallow(<MessagesPage users={[]} isLoggedIn />);
    expect(wrapper).toMatchSnapshot();
  });
});
