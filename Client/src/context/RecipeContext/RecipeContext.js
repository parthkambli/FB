import { createContext, useReducer } from "react";
import RecipeReducer from "./RecipeReducer";
import api from "../api";

// Initial State ------------------------------------------------------------------------
const initialState = {
  recipes: [],
  error: null,
  loading: true,
};

// Create Context ------------------------------------------------------------------------
export const RecipeContext = createContext(initialState);

// Provider Component --------------------------------------------------------------------
export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  // Actions --------------------------------------------------------

  // Get all Recipes ------------------------------
  const GetAllRecipes = async () => {
    try {
      const res = await api.get("/api/recipes/explore");
      dispatch({
        type: "GET_ALL_RECIPES",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Get users Recipes ----------------------------
  const GetUsersRecipes = async () => {
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get("/api/recipes/profile", config);
      dispatch({
        type: "GET_USERS_RECIPES",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  };

  // Add Recipe -----------------------------------
  const AddRecipe = async (recipe) => {
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.post("/api/recipes/profile", recipe, config);
      dispatch({
        type: "ADD_RECIPE",
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
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        error: state.error,
        loading: state.loading,
        GetAllRecipes,
        GetUsersRecipes,
        AddRecipe,
        resetError,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
