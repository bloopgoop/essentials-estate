import AuthContext from "context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import propertyService from "services/property/propertyAPI";
import "./Dropbox.css";

function Dropbox({ id }: { id: number }) {
  const MAX_FILES = 20;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [descriptions, setDescriptions] = useState(Array(MAX_FILES).fill(""));
  const dropboxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // set the image state to the url of file to display preview
    if (imageFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === FileReader.DONE) {
          setImage(reader.result as string);
          setImageName(imageFiles[index].name);
        }
      };
      reader.readAsDataURL(imageFiles[index]);
    }
  }, [imageFiles, index]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (!target.files) {
      console.log("No files selected");
      return;
    }
    // check file type
    for (let i = 0; i < target.files.length; i++) {
      const fileType = target.files[i].type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        alert("Only .png and .jpg files are allowed");
        return;
      }
    }
    // combine existing files and new files
    if (imageFiles.length + target.files.length > MAX_FILES) {
      console.log(`You can only upload ${MAX_FILES} files at a time`);
      return;
    }
    setImageFiles((prevImageFiles) => [
      ...prevImageFiles,
      ...(target.files ? Array.from(target.files) : []),
    ]); // asynchronous
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer.files) {
      console.log("No files selected");
      return;
    }
    // check file type
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const fileType = e.dataTransfer.files[i].type;
      if (fileType !== "image/png" && fileType !== "image/jpeg") {
        console.log("Only .png and .jpg files are allowed");
        return;
      }
    }
    if (imageFiles.length + e.dataTransfer.files.length > MAX_FILES) {
      console.log(`You can only upload ${MAX_FILES} files at a time`);
      return;
    }
    setImageFiles([...imageFiles, ...e.dataTransfer.files]); // asynchronous
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // shallow copy of descriptions
    let newDescriptions = [...descriptions];
    // shallow copy of item at index
    let item = newDescriptions[index];
    // update item's value
    item = e.target.value;
    // put item back into newDescriptions
    newDescriptions[index] = item;
    // update state
    setDescriptions(newDescriptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // use auth context to send auth token to backend
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      // append files to formData files
      formData.append(`file${i}`, imageFiles[i]);
    }
    // append descriptions to formData data
    formData.append("descriptions", JSON.stringify(descriptions));
    formData.append("token", auth.authTokens.access); // JWT token
    formData.append("propertyID", id.toString()); // property id

    // send formData to backend
    propertyService
      .addPhoto(formData)
      .then((response) => {
        alert("Photos added successfully");
        navigate("/property/" + id);
      })
      .catch((error) => {
        alert(`Error adding photos: ${error}`);
      });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropboxRef.current) {
      dropboxRef.current.style.backgroundColor = "lightgray";
      dropboxRef.current.style.boxShadow =
        "inset 0px 0px 10px 5px rgba(0, 0, 0, 0.2)";
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropboxRef.current) {
      dropboxRef.current.style.backgroundColor = "white";
      dropboxRef.current.style.boxShadow = "none";
    }
  };

  return (
    <>
      {imageFiles.length > 0 ? <h1>{imageName}</h1> : null}

      <div id="dropbox">
        <div
          className="bin bg-accent"
          ref={dropboxRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          data-testid="dropzone"
        >
          {!image ? (
            `Drop images here`
          ) : (
            <img className="dropbox-image" src={image} alt="upload-preview" />
          )}
        </div>
      </div>

      <label htmlFor="file-input-button" className="file-upload">
        <span>Upload file:</span>
        <input
          id="file-input-button"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          data-testid="file-input"
        />
        <div>{imageFiles.length} images selected</div>
      </label>

      <div id="description-container">
        {imageFiles.length > 0 ? (
          <div id="description-input-box">
            <label htmlFor="description-input" className="description">
              Description:
            </label>
            <input
              id="description-input"
              type="textarea"
              ref={descriptionInputRef}
              value={descriptions[index]}
              onChange={handleDescriptionChange}
            />
          </div>
        ) : null}

        <div id="description-button-container">
          {index > 0 ? (
            <button type="button" onClick={() => setIndex(index - 1)}>
              Previous
            </button>
          ) : (
            <div></div>
          )}
          {index < imageFiles.length - 1 ? (
            <button type="button" onClick={() => setIndex(index + 1)}>
              Next
            </button>
          ) : null}
        </div>
      </div>
      {imageFiles.length > 0 ? (
        <button type="button" onClick={handleSubmit} id="add-photos-btn">
          Finish
        </button>
      ) : null}
    </>
  );
}

export default Dropbox;
