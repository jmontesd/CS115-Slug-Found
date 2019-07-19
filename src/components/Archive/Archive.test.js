import React from 'react';
import ReactDOM from 'react-dom';
import Archive from './Archive';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Archive />, div);
  ReactDOM.unmountComponentAtNode(div);
});
