import { createContext, useReducer } from "react";
import ProfileReducer from "./ProfileReducer";
import api from "../api";

// Initial State ------------------------------------------------------------------------
const initialState = {
  profile: [],
  userData: [],
  error: null,
  success: null,
  loading: false,
};

// Create Context ------------------------------------------------------------------------
export const ProfileContext = createContext(initialState);

// Provider Component --------------------------------------------------------------------
export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  // Actions --------------------------------------------------------

  // Get logedIn User Profile ---------------------
  const getProfile = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
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

  // Get other user data --------------------------
  const getUserData = async (user_name) => {
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/user/${user_name}`, config);
      dispatch({
        type: "GET_USER_DATA",
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

  // Reset Success --------------------------------
  async function resetSuccess() {
    dispatch({
      type: "RESET_SUCCESS",
      payload: null,
    });
  }

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
        profile: state.profile,
        userData: state.userData,
        success: state.success,
        error: state.error,
        loading: state.loading,
        getProfile,
        getUserData,
        editProfile,
        resetSuccess,
        resetError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
