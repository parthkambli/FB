/* eslint-disable jsx-a11y/anchor-is-valid */
import ProfilePicture from "../assets/Profile.png";
import RecipeCard from "../components/RecipeCard";

const Profile = () => {
  return (
    <div className="container">
      <div className="p-2 my-2" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="row p-2">
          <div className="col-md-6">
            <div className="d-flex">
              <img
                src={ProfilePicture}
                alt="Profile"
                width="200"
                height="200"
                className="rounded-circle"
              />
              <div className="p-3">
                <h2 className="m-0" style={{ color: "#FC7300" }}>
                  Sanjeev Kapoor
                </h2>
                <p>SanjeevKapoor@gail.com</p>
                <p style={{ color: "#FC7300" }}>50 Recipes</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-sm rounded-pill m-2"
                style={{ backgroundColor: "#FC7300", color: "#F1F1F1" }}
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="btn btn-sm rounded-pill m-2"
                style={{ backgroundColor: "#FC7300", color: "#F1F1F1" }}
              >
                Add Recipe
              </button>
            </div>
          </div>
        </div>
        {/* <hr className="mb-0" style={{ color: "#FC7300" }} /> */}

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Recipes
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Saved
            </a>
          </li>
        </ul>
      </div>
      <div className="row py-2">
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
