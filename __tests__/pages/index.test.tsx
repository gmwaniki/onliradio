import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';

describe('HomePage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Should check if homepage loads without any errors', () => {
    render(<Home />);
    expect(screen.getByText(/Listen to radio$/i)).toBeInTheDocument();
    // expect()
  });
  it('Should Check if link to app works', async () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /Listen$/i });
    expect(link).toHaveAttribute('href', '/app');

    // await waitFor(() => screen.getByPlaceholderText(/enter a station name/i));
  });
});
