import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  test("Documents Tab is default rendered tab", () => {
    render(<App />);
    const DocumentTab = screen.getByLabelText("Document List");
    expect(DocumentTab).toBeInTheDocument();
  });
})

