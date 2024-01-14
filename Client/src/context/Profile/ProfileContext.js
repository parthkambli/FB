import { createContext, useReducer } from "react";
import ProfileReducer from "./ProfileReducer";
import api from "../api";

// Initial State ------------------------------------------------------------------------
const initialState = {
  profile: [],
  userData: [],
  loading: false,
  error: null,
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
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Get other user data --------------------------
  const getUserData = async (user_name) => {
    dispatch({ type: "SET_LOADING", payload: true });
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
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
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
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        userData: state.userData,
        error: state.error,
        loading: state.loading,
        getProfile,
        getUserData,
        editProfile,
        resetError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
