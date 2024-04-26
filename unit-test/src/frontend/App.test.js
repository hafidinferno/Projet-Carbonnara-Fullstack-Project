import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../src/frontend/App.jsx';

// Mocking pages/components
jest.mock('./pages/Accueil', () => () => <div data-testid="accueil">Accueil Page</div>);
jest.mock('./pages/Hello', () => () => <div data-testid="hello">Hello Page</div>);
jest.mock('./pages/Test1', () => () => <div data-testid="test1">Test1 Page</div>);
jest.mock('./pages/Test2', () => () => <div data-testid="test2">Test2 Page</div>);
jest.mock('./pages/Test3', () => () => <div data-testid="test3">Test3 Page</div>);
jest.mock('./pages/Test4', () => () => <div data-testid="test4">Test4 Page</div>);
jest.mock('./pages/Test5', () => () => <div data-testid="test5">Test5 Page</div>);
jest.mock('./pages/Test6', () => () => <div data-testid="test6">Test6 Page</div>);
jest.mock('./pages/AboutUs', () => () => <div data-testid="aboutus">About Us Page</div>);
jest.mock('./pages/ResultPage', () => () => <div data-testid="resultpage">Result Page</div>);

test('renders correct routes', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Assert that the correct components are rendered for each route
  expect(screen.getByTestId('accueil')).toBeInTheDocument();
  expect(screen.queryByTestId('hello')).toBeNull(); // Hello route not active
  expect(screen.getByTestId('test1')).toBeInTheDocument();
  expect(screen.queryByTestId('test2')).toBeNull(); // Test2 route not active
  expect(screen.getByTestId('test3')).toBeInTheDocument();
  expect(screen.queryByTestId('test4')).toBeNull(); // Test4 route not active
  expect(screen.queryByTestId('test5')).toBeNull(); // Test5 route not active
  expect(screen.queryByTestId('test6')).toBeNull(); // Test6 route not active
  expect(screen.queryByTestId('aboutus')).toBeNull(); // AboutUs route not active
  expect(screen.queryByTestId('resultpage')).toBeNull(); // ResultPage route not active
});
