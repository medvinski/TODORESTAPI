import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import App from "./App";
import Input from "./components/Input";

test("renders the app header", () => {
  render(<App />);
  const headerElement = screen.getByText("My To-do List");
  expect(headerElement).toBeInTheDocument();
});
test("renders the loading message while fetching tasks", () => {
  render(<App />);
  const loadingElement = screen.getByText(/Loading tasks.../i);
  expect(loadingElement).toBeInTheDocument();
});

test("displays current time", async () => {
  render(<App />);

  await waitFor(() => {
    const clockElement = screen.getByText(/current time/i);
    expect(clockElement).toBeInTheDocument();
    expect(clockElement.textContent).toContain("Current Time:");
  });
});

test("renders background", () => {
  render(<App />);
  const backgroundElement = screen.getByTestId("background");
  expect(backgroundElement).toBeInTheDocument();
});
