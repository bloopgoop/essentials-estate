import { render, fireEvent, screen } from "@testing-library/react";
import Gallery from "../Gallery";

const mockPhotos = [
  { photo: "photo1.jpg", description: "Photo 1" },
  { photo: "photo2.jpg", description: "Photo 2" },
  { photo: "photo3.jpg", description: "Photo 3" },
];

test("renders correctly", () => {
  render(<Gallery photos={mockPhotos} />);

  // Check if the main image and description are set correctly on initial render
  expect(screen.getByTestId("main-img").src).toContain("photo1.jpg");
  expect(screen.getByTestId("main-img").title).toBe("main-img");

  // Check if the gallery images are rendered
  expect(screen.getByTestId("img0").src).toContain("photo1.jpg");
  expect(screen.getByTestId("img1").src).toContain("photo2.jpg");
  expect(screen.getByTestId("img2").src).toContain("photo3.jpg");
});

test("updates main image and description on click", () => {
  render(<Gallery photos={mockPhotos} />);

  // Simulate a click on the second image in the gallery
  fireEvent.click(screen.getByTestId("img1"));

  // Check if the main image and description are updated
  expect(screen.getByTestId("main-img").src).toContain("photo2.jpg");
});
