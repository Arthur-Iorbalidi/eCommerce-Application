import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import Error from '../src/components/Error/Error';

describe('Error Component', () => {
  describe('Rendering Text Elements', () => {
    it('renders without crashing and displays expected text messages', () => {
      render(
        <BrowserRouter>
          <Error />
        </BrowserRouter>,
      );

      expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
      expect(screen.getByText(/You are lost/i)).toBeInTheDocument();
    });
  });

  describe('Rendering Media Elements', () => {
    it('renders without crashing and displays the error image', () => {
      render(
        <BrowserRouter>
          <Error />
        </BrowserRouter>,
      );

      expect(screen.getByAltText('errorImage')).toBeInTheDocument();
    });
  });

  describe('Rendering Interactive Elements', () => {
    it('includes a link to go back to the main page', () => {
      render(
        <BrowserRouter>
          <Error />
        </BrowserRouter>,
      );

      expect(
        screen.getByRole('link', { name: /Go main/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Interactivity', () => {
    it('should navigate to home page when clicking on the go main button', () => {
      render(
        <BrowserRouter>
          <Error />
        </BrowserRouter>,
      );

      const goMainButton = screen.getByRole('button', { name: /go main/i });
      fireEvent.click(goMainButton);

      expect(window.location.pathname).toBe('/');
    });
  });
});
