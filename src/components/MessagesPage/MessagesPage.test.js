import React from 'react';
import ReactDOM from 'react-dom';
import MessagesPage from './MessagesPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessagesPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
