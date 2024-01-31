import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import LoggedInRoutes from "./utils/LoggedInRoutes";

import ErrorPage from "./pages/Error/Error";
import Login from "./pages/Authenticate/Login";
import Register from "./pages/Authenticate/Register";
import Search from "./pages/Search/Search";
import Property from "./pages/Property/Property";
import Profile from "./pages/Profile/Profile";
import Payment from "./pages/Payment/Payment";
import AddProperty from "./pages/AddProperty/AddProperty";
import AddPhotos from "pages/AddPhotos/AddPhotos";
import Assets from "./pages/Profile/ProfileAssets/Assets";
import AssetEdit from "./pages/Profile/ProfileAssets/AssetEdit/AssetEdit";
import PhotoDelete from "./pages/Profile/ProfileAssets/PhotoDelete/PhotoDelete";
import Watchlist from "pages/Profile/Watchlist/Watchlist";
import Status from "pages/Profile/Status/Status";
import Review from "pages/Review/Review";
import AdminRoutes from "./utils/AdminRoutes";
import PropertyReview from "pages/Review/PropertyReview/PropertyReview";
// import Profilemain from "pages/Profile/Main/Profilemain";

function App() {
  return (
    <div className="App">
      
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<LoggedInRoutes />}>
              <Route element={<Profile />} path="/profile/">
                {/* <Route element={<Profilemain />} path="" /> */}
                <Route element={<Assets />} path="assets" />
                <Route element={<AssetEdit />} path="assets/:id" />
                <Route element={<PhotoDelete />} path="assets/photo/:id/" />
                <Route element={<Watchlist />} path="watchlist" />
                <Route element={<Status />} path="status" />
              </Route>

              <Route element={<Payment />} path="/payment" />
              <Route element={<AddProperty />} path="/add-property" />
              <Route element={<AddPhotos />} path="/add-photo" />
            </Route>

            <Route element={<AdminRoutes />}>
              <Route element={<Review />} path="/review" />
              <Route element={<PropertyReview />} path="/review/:id" />
            </Route>

            <Route element={<Search />} path="/" exact />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Property />} path="/property/:id" />
            <Route element={<ErrorPage />} path="/error" />

            <Route element={<Navigate to={"/error"} replace />} path="*" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
