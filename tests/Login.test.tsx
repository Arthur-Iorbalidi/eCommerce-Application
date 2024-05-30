import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/components/Login/login';
import { store } from '../src/store/store';

describe('Login Component', () => {
  it('renders without crashing and includes Login Form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>,
    );

    const loginContainer = screen.getByTestId('login_container');
    expect(loginContainer).toBeInTheDocument();

    const loginForm = screen.getByTestId('login_form');
    expect(loginForm).toBeInTheDocument();
  });
});
