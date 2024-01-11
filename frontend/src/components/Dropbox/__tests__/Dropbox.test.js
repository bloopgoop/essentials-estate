import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dropbox from "components/Dropbox/Dropbox";

describe("Dropbox", () => {
  it.skip("displays number of selected images when file is uploaded", async () => {
    render(
      <BrowserRouter>
        <Dropbox />
      </BrowserRouter>
    );
    const fileInput = screen.getByTestId("file-input");

    // Create a FileList object
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const fileList = {
      0: file,
      length: 1,
      item: (index) => file,
    };

    // Simulate the file upload
    fireEvent.change(fileInput, { target: { files: fileList } });

    // Check if the number of selected images is displayed
    expect(await screen.findByText(/1 images selected/i)).toBeInTheDocument();
  });
});
