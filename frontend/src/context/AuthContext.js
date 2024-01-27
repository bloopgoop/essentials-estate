import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  // https://dev.to/msshanmukh/lazy-initialization-and-storing-functions-with-react-usestate-hook-1ah
  // Lazy initialization. Load from local storage only once in life cycle by using callback
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  // Log in function. Takes in event from form submission
  const loginUser = async (event) => {
    event.preventDefault();
    let body = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    axios
      .post("http://localhost:8000/api/token/", body)
      .then((response) => {
        if (response.status === 200) {
          // Set tokens and user as decoded access token
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));
          localStorage.setItem("authTokens", JSON.stringify(response.data));
          return navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  // Log out function removes tokens from local storage and sets user to null
  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }, []);

  const updateToken = useCallback(async () => {
    console.log("Updating token");
    let body = {
      refresh: authTokens?.refresh,
    };
    axios
      .post("http://localhost:8000/api/token/refresh/", body)
      .then((response) => {
        if (response.status === 200) {
          // Set tokens and user as decoded access token
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));
          localStorage.setItem("authTokens", JSON.stringify(response.data));
        } else {
          logoutUser();
        }
      })
      .catch((error) => {
        console.log(error);
        logoutUser();
      });

    if (loading) {
      setLoading(false);
    }
  }, [authTokens, loading, logoutUser]);

  const contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    user: user,
    authTokens: authTokens,
    isAdmin: user?.is_admin,
  };

  // Eventually make axios calls refresh tokens instead of having timer
  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 59);
    return () => clearInterval(interval);
  }, [authTokens, loading, updateToken]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
