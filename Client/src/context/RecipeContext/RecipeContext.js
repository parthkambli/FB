import { createContext, useReducer } from "react";
import RecipeReducer from "./RecipeReducer";
import api from "../api";

// Initial State ------------------------------------------------------------------------
const initialState = {
  recipes: [],
  recipe: [],
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
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get("/api/recipes/explore", config);
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

  // Get single Recipe ----------------------------
  const GetSingleRecipe = async (id) => {
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/recipes/${id}`, config);
      dispatch({
        type: "GET_RECIPE",
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
  const GetUsersRecipes = async (user_id) => {
    const token = localStorage.getItem("user");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/recipes/profile/${user_id}`, config);
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
        recipe: state.recipe,
        error: state.error,
        loading: state.loading,
        GetAllRecipes,
        GetSingleRecipe,
        GetUsersRecipes,
        AddRecipe,
        resetError,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
