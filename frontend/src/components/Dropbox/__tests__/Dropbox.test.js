import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dropbox from "components/Dropbox/Dropbox";

test("simulate drag and drop of an image file", async () => {
  // const { container } = render(<Dropbox />);
  render(
    <BrowserRouter>
      <Dropbox />
    </BrowserRouter>
  );
  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

  // simulate a drag and drop event
  const dropzone = screen.getByTestId("dropzone");
  fireEvent.dragEnter(dropzone, {
    dataTransfer: { files: [file] },
  });
  fireEvent.dragOver(dropzone, {
    dataTransfer: { files: [file] },
  });
  fireEvent.drop(dropzone, {
    dataTransfer: { files: [file] },
  });

  const selectedImagesText = await screen.findByText(/1 images selected/i);
  expect(selectedImagesText).toBeInTheDocument();

  const imageNameElement = await screen.findByText("chucknorris.png");
  expect(imageNameElement).toBeInTheDocument();

  // console.log(prettyDOM(container));
});

test("description can be edited", async () => {
  render(
    <BrowserRouter>
      <Dropbox />
    </BrowserRouter>
  );
  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

  const dropzone = screen.getByTestId("dropzone");
  fireEvent.dragEnter(dropzone, {
    dataTransfer: { files: [file] },
  });
  fireEvent.dragOver(dropzone, {
    dataTransfer: { files: [file] },
  });
  fireEvent.drop(dropzone, {
    dataTransfer: { files: [file] },
  });

  const descriptionInput = screen.getByLabelText("Description:");
  fireEvent.change(descriptionInput, {
    target: { value: "Description of Chuck Norris" },
  });
  expect(descriptionInput.value).toBe("Description of Chuck Norris");
});

test("next and back button changes main image and main description", async () => {
  render(
    <BrowserRouter>
      <Dropbox />
    </BrowserRouter>
  );
  const file1 = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  const file2 = new File(["(□_□⌐)"], "chucknorris2.png", { type: "image/png" });

  const dropzone = screen.getByTestId("dropzone");
  fireEvent.dragEnter(dropzone, {
    dataTransfer: { files: [file1, file2] },
  });
  fireEvent.dragOver(dropzone, {
    dataTransfer: { files: [file1, file2] },
  });
  fireEvent.drop(dropzone, {
    dataTransfer: { files: [file1, file2] },
  });

  const descriptionInput = screen.getByLabelText("Description:");

  // Description for first image
  fireEvent.change(descriptionInput, {
    target: { value: "Description of Chuck Norris" },
  });
  expect(descriptionInput.value).toBe("Description of Chuck Norris");

  // Click next button, expect new description to be empty
  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);
  expect(descriptionInput.value).toBe("");

  // Description for second image
  fireEvent.change(descriptionInput, {
    target: { value: "This is another description of Chuck Norris" },
  });
  expect(descriptionInput.value).toBe(
    "This is another description of Chuck Norris"
  );

  // Click back button, expect description to be "Description of Chuck Norris"
  const backButton = screen.getByText("Previous");
  fireEvent.click(backButton);
  expect(descriptionInput.value).toBe("Description of Chuck Norris");
});

test("dropbox only holds 20 items", async () => {
  render(
    <BrowserRouter>
      <Dropbox />
    </BrowserRouter>
  );

  // Create 20 mock files
  const files = [];
  for (let i = 0; i < 20; i++) {
    const file = new File([`File ${i + 1}`], `file${i + 1}.txt`, {
      type: "text/plain",
    });
    files.push(file);
  }

  // Create extra mock file
  const extraFile = new File([`File 21`], `file21.txt`, { type: "text/plain" });

  const dropzone = screen.getByTestId("dropzone");
  fireEvent.dragEnter(dropzone, {
    dataTransfer: { files: [...files] },
  });
  fireEvent.dragOver(dropzone, {
    dataTransfer: { files: [...files] },
  });
  fireEvent.drop(dropzone, {
    dataTransfer: { files: [...files] },
  });

  const selectedImagesText = await screen.findByText(/20 images selected/i);
  expect(selectedImagesText).toBeInTheDocument();

  fireEvent.dragEnter(dropzone, {
    dataTransfer: { files: [extraFile] },
  });
  fireEvent.dragOver(dropzone, {
    dataTransfer: { files: [extraFile] },
  });
  fireEvent.drop(dropzone, {
    dataTransfer: { files: [extraFile] },
  });

  // Number of files do not change when trying to add over 20 files
  const selectedImagesText2 = await screen.findByText(/20 images selected/i);
  expect(selectedImagesText2).toBeInTheDocument();
});
