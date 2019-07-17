import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ItemPage } from './ItemPage';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<ItemPage />', () => {
  it('should ', () => {
    const wrapper = shallow(<ItemPage isLoggedIn />);
  });
});
