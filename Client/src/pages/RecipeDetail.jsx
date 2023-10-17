import { Link, useParams } from "react-router-dom";
import RecipeImg from "../assets/FoodIcon.png";
import ProfilePicture from "../assets/Profile.png";

import { FaHeart } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../context/RecipeContext/RecipeContext";
import { ProfileContext } from "../context/Profile/ProfileContext";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const { getProfile, profile } = useContext(ProfileContext);
  const { GetSingleRecipe, recipe } = useContext(RecipeContext);

  useEffect(() => {
    getProfile();
    GetSingleRecipe(recipeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-12 p-2">
          <div
            className="d-flex justify-content-between align-items-center p-2"
            style={{ backgroundColor: "#F1F1F1" }}
          >
            <Link to="/Profile" className="text-decoration-none text-black">
              <div className="d-flex justify-content-start align-items-center">
                <img
                  src={profile.Profile_Picture || ProfilePicture}
                  alt="Profile"
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
                <h6 className="m-0 ms-2">{profile.User_Name}</h6>
              </div>
            </Link>
            <h2 className="m-0 align-self-end" style={{ color: "#FC7300" }}>
              {recipe.Recipe_Title}
            </h2>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="card text-bg-dark border border-0">
            <img
              src={recipe.Recipe_Image || RecipeImg}
              className="card-img rounded rounded-0"
              alt="..."
            />
            <div className="card-img-overlay">
              <span
                className="position-absolute bottom-0 end-0 badge m-2"
                style={{
                  backgroundColor: "rgba(0, 66, 90, 0.7)",
                  color: "#FFFFFF",
                }}
              >
                128k <FaHeart />
              </span>
            </div>
          </div>
          {recipe && recipe.Ingredients ? (
            <div className="p-3 my-2" style={{ backgroundColor: "#FC7300" }}>
              <h3 style={{ color: "#F1F1F1" }}>Ingredients :-</h3>
              <ul>
                {recipe.Ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading Ingredients...</p>
          )}
        </div>
        <div className="col-md-8">
          <div className="p-3 h-100" style={{ backgroundColor: "#00425A" }}>
            <div className="d-flex justify-content-between align-items-start">
              <h3 style={{ color: "#FC7300" }}>Recipe :-</h3>
              {recipe && recipe.Recipe_Type && (
                <div>
                  {recipe.Recipe_Type.map((tag, index) => (
                    <span
                      className="badge rounded-pill fs-6 mx-1"
                      style={{ backgroundColor: "#FC7300" }}
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p style={{ color: "#F1F1F1" }}>{recipe.Recipe}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
