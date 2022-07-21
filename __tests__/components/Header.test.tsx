import { fireEvent, render, screen } from '@testing-library/react';
import Header from '../../src/components/Header/Header';
import '@testing-library/jest-dom';

test('Menu loads with hamburger menu', () => {
  window.innerWidth = 300;
  const { getByTestId } = render(<Header />);
  expect(getByTestId('hamburger')).toBeInTheDocument();
});
test('Close menu icon is shown on click menu button ', () => {
  window.innerWidth = 300;
  const { getByRole, getByTestId } = render(<Header />);
  fireEvent.click(getByRole('button', { name: 'Menu' }));
  expect(getByTestId('closemenu')).toBeInTheDocument();
});
