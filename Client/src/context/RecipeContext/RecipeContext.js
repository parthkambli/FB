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

  // Get all Recipes -------------------
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

  return (
    <RecipeContext.Provider
      value={{
        recipes: state.recipes,
        error: state.error,
        loading: state.loading,
        GetAllRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
