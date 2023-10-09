import { createContext, useReducer } from "react";
import ProfileReducer from "./ProfileReducer";
import api from "../api";

// Initial State ------------------------------------------------------------------------
const initialState = {
  user: [],
  error: null,
  success: null,
  loading: true,
};

// Create Context ------------------------------------------------------------------------
export const ProfileContext = createContext(initialState);

// Provider Component --------------------------------------------------------------------
export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  // Actions --------------------------------------------------------

  // Get User Profile -----------------------------
  const getProfile = async () => {
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get("/api/user/profile", config);
      dispatch({
        type: "GET_PROFILE",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Edit Profile ---------------------------------
  const editProfile = async (edits) => {
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.patch("/api/user/profile", edits, config);
      dispatch({
        type: "EDIT_PROFILE",
        payload: res.data.data,
      });
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
    <ProfileContext.Provider
      value={{
        user: state.user,
        error: state.error,
        loading: state.loading,
        getProfile,
        editProfile,
        resetError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
