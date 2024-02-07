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
import AddPhotos from "pages/AddPhotos/AddPhotos";
import Assets from "./pages/Profile/ProfileAssets/Assets";
import AssetEdit from "./pages/Profile/ProfileAssets/AssetEdit/AssetEdit";
import PhotoDelete from "./pages/Profile/ProfileAssets/PhotoDelete/PhotoDelete";
import Watchlist from "pages/Profile/Watchlist/Watchlist";
import Status from "pages/Profile/Status/Status";
import Review from "pages/Review/Review";
import AdminRoutes from "./utils/AdminRoutes";
import PropertyReview from "pages/Review/PropertyReview/PropertyReview";
import { ThemeProvider } from "context/ThemeContext";
import PropertyForm from "pages/PropertyForm/PropertyForm";
import BasicInfo from "pages/PropertyForm/BasicInfo/BasicInfo";
import PaymentInfo from "./pages/PropertyForm/PaymentInfo/PaymentInfo";
import PropertyInfo from "./pages/PropertyForm/PropertyInfo/PropertyInfo";
import ConfirmInfo from "./pages/PropertyForm/ConfirmInfo/ConfirmInfo";
// import Profilemain from "pages/Profile/Main/Profilemain";

function App() {
  return (
    <div className="App overflow-x-hidden">
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
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

                <Route element={<AddPhotos />} path="add-photo" />

                <Route element={<PropertyForm />} path="/property-form/">
                  <Route element={<BasicInfo />} path="basic-info" />
                  <Route element={<PaymentInfo />} path="payment-info" />
                  <Route element={<PropertyInfo />} path="property-info" />
                  <Route element={<ConfirmInfo />} path="confirm-info" />
                </Route>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
