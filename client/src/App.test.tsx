import App from './App';
import React from 'react';
import { render, wait, waitForElement } from '@testing-library/react';



test('renders app header', () => {
  const { getByText } = render(<App />);
  const headerText = getByText("Analytics Dashboard");
  expect(headerText).toBeInTheDocument();
});

test('renders user name', () => {
  const { getByText } = render(<App />);
  const headerText = getByText("Welcome, Guest!");
  expect(headerText).toBeInTheDocument();
});

test('Check first loading message appears to ensure data fetching started', () => {
  const { getByText } = render(<App />);
  const loadingMessage = getByText("Loading...");
  expect(loadingMessage).toBeInTheDocument();
});

test('Check second loading message appears to ensure data fetching started', () => {
  const { getByText } = render(<App />);
  const loadingMessage = getByText("This might take a while. Hang on!");
  expect(loadingMessage).toBeInTheDocument();
});
