import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextInterface {
  loginUser:
    | ((event: React.FormEvent<HTMLFormElement>) => Promise<void>)
    | (() => void);
  logoutUser: () => void;
  user: AccessToken | null;
  authTokens: Tokens | null;
  isAdmin: boolean | undefined;
}

interface Tokens {
  access: string;
  refresh: string;
}

interface AccessToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  is_staff: boolean;
}

const AuthContext = createContext<AuthContextInterface>({
  loginUser: () => {},
  logoutUser: () => {},
  user: null,
  authTokens: null,
  isAdmin: false,
});

export default AuthContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // https://dev.to/msshanmukh/lazy-initialization-and-storing-functions-with-react-usestate-hook-1ah
  // Lazy initialization. Load from local storage only once in life cycle by using callback
  const [authTokens, setAuthTokens] = useState<Tokens | null>(() => {
    const tokenString = localStorage.getItem("authTokens");
    const storedTokens: Tokens = tokenString ? JSON.parse(tokenString) : null;
    return storedTokens;
  });
  const [user, setUser] = useState<AccessToken | null>(() => {
    const tokenString = localStorage.getItem("authTokens");
    const storedTokens: Tokens = tokenString ? JSON.parse(tokenString) : null;
    if (storedTokens) {
      return jwtDecode(storedTokens.access) as AccessToken;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  // Log in function. Takes in event from form submission
  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let body = {
      username: formData.get("username"),
      password: formData.get("password"),
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

  const contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    user: user,
    authTokens: authTokens,
    isAdmin: user?.is_staff,
  };

  useEffect(() => {
    const updateToken = () => {
      console.log("Updating token");
      if (authTokens) {
        let body = {
          refresh: authTokens.refresh as string,
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
              logoutUser(); // If refresh token is invalid, log out user
            }
          })
          .catch((error) => {
            console.log(error);
            logoutUser();
          });
      }
      if (loading) {
        setLoading(false);
      }
    };

    if (loading) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 59);
    return () => clearInterval(interval);
  }, [authTokens, loading, logoutUser]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
