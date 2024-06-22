import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/store/store';
import Registration from '../src/components/Registration/registration';

describe('Registration Component', () => {
  it('renders without crashing and includes Registration Form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Registration />
        </BrowserRouter>
      </Provider>,
    );

    const registrationContainer = screen.getByTestId('registration_container');
    expect(registrationContainer).toBeInTheDocument();

    const registrationForm = screen.getByTestId('registration_form');
    expect(registrationForm).toBeInTheDocument();
  });
});
