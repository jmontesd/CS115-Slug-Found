import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Item } from '../components/Item/Item';

// needed for shallow rendering
configure({ adapter: new Adapter() });

describe('<Item />', () => {
  it('should render Item properly', () => {
    const wrapper = shallow(
      <Item
        post={{ id: '1', createAt: 0, title: 'title', imageURL: 'http://placehold.it/300x300' }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
