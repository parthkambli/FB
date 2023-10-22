import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import api from "../api";

// Initial State ------------------------------------------------------------------------
const initialState = {
  user: localStorage.getItem("user") || null,
  error: null,
};

// Create Context ------------------------------------------------------------------------
export const AuthContext = createContext(initialState);

// Provider Component --------------------------------------------------------------------
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Actions --------------------------------------------------------

  // Signup ---------------
  const SignUp = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post("/api/user/signup", user, config);
      localStorage.setItem("user", res.data.token);
      dispatch({
        type: "LOGIN",
        payload: res.data.token,
      });
      window.location.reload();
    } catch (error) {
      dispatch({
        type: "RESET_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Login ----------------
  const LogIn = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post("/api/user/login", user, config);
      localStorage.setItem("user", res.data.token);
      dispatch({
        type: "LOGIN",
        payload: res.data.token,
      });
      window.location.reload();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Logout ---------------
  const LogOut = async () => {
    try {
      localStorage.removeItem("user");
      dispatch({
        type: "LOGOUT",
      });
      window.location.reload();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Reset Error ----------------------------------
  async function resetError() {
    dispatch({
      type: "ERROR",
      payload: null,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        resetError,
        SignUp,
        LogIn,
        LogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
