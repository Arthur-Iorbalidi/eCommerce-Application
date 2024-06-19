import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { store } from '../src/store/store';
import Main from '../src/components/Main/main';

describe('Main component', () => {
  it('renders without crashing and includes Header', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    );

    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
});
