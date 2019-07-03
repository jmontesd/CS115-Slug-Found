import React from 'react';
import ReactDOM from 'react-dom';
import SubmitPage from './SubmitPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubmitPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
