import { useContext, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../context/RecipeContext/RecipeContext";

const Home = () => {
  const { GetAllRecipes, recipes, loading } = useContext(RecipeContext);

  useEffect(() => {
    GetAllRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container ">
      {!loading ? (
        <div className="row py-2">
          {recipes.map((recipe) => (
            <div className="col-xl-3 col-lg-4 col-sm-6" key={recipe._id}>
              <RecipeCard
                id={recipe._id}
                userName={recipe.user_id.User_Name}
                userImage={recipe.user_id.Profile_Picture}
                recipeImage={recipe.Recipe_Image}
                title={recipe.Recipe_Title}
                tags={recipe.Recipe_Type}
                ingredients={recipe.Ingredients}
                recipe={recipe.Recipe}
                showUser={true}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "88vh" }}
        >
          <h2 className="blinking-text" style={{ color: "#FC7300" }}>
            <div
              className="spinner-border mx-3"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
