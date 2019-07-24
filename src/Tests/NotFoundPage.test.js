import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NotFoundPage } from '../components/NotFoundPage/NotFoundPage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<NotFoundPage />', () => {
  it('should render NotFoundPage properly', () => {
    // test creates snapshot of component and checks if matches
    // previously create snapshot
    const wrapper = shallow(<NotFoundPage isLoggedIn />);
    expect(wrapper).toMatchSnapshot();
  });
});
