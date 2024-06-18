import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import '@testing-library/jest-dom/vitest';
import Header from '../src/components/Main/components/header/header';

describe('Header Component', () => {
  it('renders Logo and TopMenu on large screens', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByTestId('top_menu')).toBeInTheDocument();
  });

  it('includes side menu button on tablet screen', () => {
    window.innerWidth = 767;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const sideMenuBtn = screen.getByTestId('burger_menu');

    expect(sideMenuBtn).toBeInTheDocument();
  });

  it('includes side menu button on mobile screen', () => {
    window.innerWidth = 390;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const sideMenuBtn = screen.getByTestId('burger_menu');

    expect(sideMenuBtn).toBeInTheDocument();
  });

  it('toggles Side Menu on click', () => {
    window.innerWidth = 390;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const sideMenuOpenBtn = screen.getByTestId('burger_menu');
    fireEvent.click(sideMenuOpenBtn);

    const sideMenuCloseBtn = screen.getByTestId('burger_menu');
    fireEvent.click(sideMenuCloseBtn);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });
});
