### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


Folder Structure
============================

### Top-level directory layout

    .
    ├── dev                     # Mock files and data used in development (use script `npm run server` to mock a backend)
    ├── src                     # Source files (alternatively `lib` or `app`)
    │   ├── assets              # Images, logos used throughout the App
    │   ├── components          # Reusable components
    │   ├── context             # Files that create contextual data to be used throughout the app
    │   ├── pages               # Pages in the application
    │   ├── services            # API layer, all the functions that make a request to a seperate application is contained here
    │   ├── utils               # Files that deal with the routing logic
    │   ├── App.js              # Overall page layout of the application. 
    │   ├── index.css           # Global styles
    │   └── index.js            # Entry point
    └── README.md


### Automated tests

> Automated tests are usually placed into the `__tests__` file of each component.

    .
    ├── ...
    ├── Navbar                  # Component folder
    │   ├── __tests__           # Test files
    │       ├── Navbar.test.js  # Load and stress tests
    │   ├── Navbar.js           # Component file containing all logic
    │   └── Navbar.css          # Styles for component
    └── ...

### 3rd party libraries

- axios
- react-router-dom
- Infinite-Scroll

