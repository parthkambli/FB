import { createContext, useReducer } from "react";
import RecipeReducer from "./RecipeReducer";
import api from "../api";

// Initial State ------------------------------------------------------------------------
const initialState = {
  recipes: [],
  recipe: [],
  error: null,
  loading: false,
};

// Create Context ------------------------------------------------------------------------
export const RecipeContext = createContext(initialState);

// Provider Component --------------------------------------------------------------------
export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  // Actions --------------------------------------------------------

  // Get all Recipes ------------------------------
  const GetAllRecipes = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
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
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Get single Recipe ----------------------------
  const GetSingleRecipe = async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
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
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
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
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        recipe: state.recipe,
        error: state.error,
        loading: state.loading,
        GetAllRecipes,
        GetSingleRecipe,
        AddRecipe,
        resetError,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
