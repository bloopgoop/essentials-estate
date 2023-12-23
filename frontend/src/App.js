import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import LoggedInRoutes from "./utils/LoggedInRoutes";

import Dashboard from "./pages/Dashboard/Dashboard";
import ErrorPage from "./pages/Error/Error";
import Login from "./pages/Authenticate/Login";
import Register from "./pages/Authenticate/Register";
import Search from "./pages/Search/Search";
import Property from "./pages/Property/Property";
import Profile from "./pages/Profile/Profile";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<LoggedInRoutes />}>
              <Route element={<Profile />} path="/profile/" />
              <Route element={<Payment />} path="/payment" />
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
