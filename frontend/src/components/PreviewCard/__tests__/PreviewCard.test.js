import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PreviewCard from "../PreviewCard";

const mockPropertyTitle = {
  id: 1,
  photos: [{ photo: "photo1.jpg" }],
  title: "Test Property",
  address: "123 Test St",
  zip: "12345",
  city: "Test City",
  description: "Test Description",
  rent: "1000",
};

const mockPropertyNoTitle = {
  id: 1,
  photos: [{ photo: "photo1.jpg" }],
  address: "123 Test St",
  zip: "12345",
  city: "Test City",
  description: "Test Description",
  rent: "1000",
};

test("renders correctly with title", () => {
  render(
    <BrowserRouter>
      <PreviewCard property={mockPropertyTitle} />
    </BrowserRouter>
  );

  // Check if the property details are displayed correctly
  expect(screen.getByText("Test Property")).toBeInTheDocument();
  expect(screen.getByText("Test Description")).toBeInTheDocument();
  expect(screen.getByText("Monthly rent: 1000")).toBeInTheDocument();

  // Check if the image source is correct
  expect(screen.getByAltText("preview").src).toContain("photo1.jpg");

  expect(screen.getByTestId("preview-link")).toHaveAttribute(
    "href",
    "/property/1"
  );
});

test("renders correctly without title", () => {
  render(
    <BrowserRouter>
      <PreviewCard property={mockPropertyNoTitle} />
    </BrowserRouter>
  );

  // Check if the property details are displayed correctly
  expect(screen.getByText("123 Test St 12345 Test City")).toBeInTheDocument();
  expect(screen.getByText("Test Description")).toBeInTheDocument();
  expect(screen.getByText("Monthly rent: 1000")).toBeInTheDocument();

  // Check if the image source is correct
  expect(screen.getByAltText("preview").src).toContain("photo1.jpg");
});
