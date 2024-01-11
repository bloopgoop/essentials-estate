import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../Register";

test("renders the form and allows typing into fields", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  // Check if the form fields are rendered and can be typed into
  const firstNameInput = screen.getByLabelText("First Name");
  fireEvent.change(firstNameInput, { target: { value: "John" } });
  expect(firstNameInput.value).toBe("John");

  const lastNameInput = screen.getByLabelText("Last Name");
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  expect(lastNameInput.value).toBe("Doe");

  const usernameInput = screen.getByLabelText("Username");
  fireEvent.change(usernameInput, { target: { value: "johndoe" } });
  expect(usernameInput.value).toBe("johndoe");

  const emailInput = screen.getByLabelText("Email");
  fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  expect(emailInput.value).toBe("john.doe@example.com");

  const passwordInput = screen.getByLabelText("Create a password");
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  expect(passwordInput.value).toBe("password123");

  const password2Input = screen.getByLabelText("Confirm your password");
  fireEvent.change(password2Input, { target: { value: "password123" } });
  expect(password2Input.value).toBe("password123");
});

test("renders the links to login and continue as guest", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  // Check if the links to login and continue as guest are rendered
  const loginLink = screen.getByText("Sign In");
  expect(loginLink).toBeInTheDocument();
  expect(loginLink.getAttribute("href")).toBe("/login");

  const guestLink = screen.getByText("Continue as guest");
  expect(guestLink).toBeInTheDocument();
  expect(guestLink.getAttribute("href")).toBe("/");
});

test("shows an error when passwords do not match", () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  const passwordInput = screen.getByLabelText("Create a password");
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  const password2Input = screen.getByLabelText("Confirm your password");
  fireEvent.change(password2Input, { target: { value: "password456" } });

  const submitButton = screen.getByText("Register");
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText("Passwords do not match");
  expect(errorMessage).toBeInTheDocument();
});

// create other client sided tests
