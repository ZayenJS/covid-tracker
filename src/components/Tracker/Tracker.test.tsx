import React from 'react';
import { render } from '@testing-library/react';
import Tracker from './Tracker';

test('renders learn react link', () => {
  const { getByText } = render(<Tracker />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
