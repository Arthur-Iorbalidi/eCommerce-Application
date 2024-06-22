import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { store } from '../src/store/store';
import RegistrationForm from '../src/components/Registration/components/registrationForm/registrationForm';

describe('RegistrationForm Component', () => {
  it('renders without crashing and displays initial state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
      </Provider>,
    );

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const LastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Password');
    const birthDateInput = screen.getByPlaceholderText('Birth date');
    const submitButton = screen.getByText('Sign Up');

    expect(firstNameInput).toBeInTheDocument();
    expect(LastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(birthDateInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should validate email field', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('E-mail');

    userEvent.type(emailInput, 'invalid_email');
    await waitFor(() =>
      expect(screen.queryByText('Email must contain @ symbol')).toBeTruthy(),
    );

    userEvent.clear(emailInput);

    await waitFor(() =>
      expect(screen.queryByText('Email is required')).toBeTruthy(),
    );

    userEvent.clear(emailInput);

    userEvent.type(emailInput, 'invalid_email@example');
    await waitFor(() =>
      expect(
        screen.queryByText('Email must contain a domain name'),
      ).toBeTruthy(),
    );
  });

  it('should validate password field', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
      </Provider>,
    );

    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(passwordInput, 'Example');
    await waitFor(() =>
      expect(
        screen.queryByText('Password must contain at least one digit'),
      ).toBeTruthy(),
    );

    userEvent.clear(passwordInput);

    userEvent.type(passwordInput, '123');
    await waitFor(() =>
      expect(
        screen.queryByText(
          'Password must contain at least one uppercase letter',
        ),
      ).toBeTruthy(),
    );

    userEvent.clear(passwordInput);

    userEvent.type(passwordInput, '123Example');
    await waitFor(() =>
      expect(
        screen.queryByText(
          'Password must contain at least one special character (!@#$%^&*-+_)',
        ),
      ).toBeTruthy(),
    );
  });

  it('should navigate to login page when clicking on Sign In link', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
      </Provider>,
    );

    const createLink = getByText('Sign in');
    expect(createLink.getAttribute('href')).toBe('/login');
  });
});
