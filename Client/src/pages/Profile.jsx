/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useState } from "react";
import ProfilePicture from "../assets/Profile.png";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/Auth/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user.Full_Name || "");
  const [userName, setUserName] = useState(user.User_Name || "");
  const [bio, setBio] = useState(user.Bio || "");

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
                onClick={console.log("user:-", user)}
                data-bs-toggle="modal"
                data-bs-target="#editProfile"
                style={{ backgroundColor: "#FC7300", color: "#F1F1F1" }}
              >
                Edit Profile
              </button>
              {/* Modal  */}
              <div
                className="modal fade"
                id="editProfile"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Edit Profile
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form className="p-4">
                        <div className="mb-3 row">
                          <label
                            htmlFor="ProfilePicture"
                            className="col-3 col-form-label"
                          >
                            Profile Picture:-
                          </label>
                          <div className="col-9">
                            <input
                              type="file"
                              className="form-control"
                              id="ProfilePicture"
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label
                            htmlFor="Name"
                            className="col-3 col-form-label"
                          >
                            Name:-
                          </label>
                          <div className="col-9">
                            <input
                              type="text"
                              className="form-control"
                              id="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label
                            htmlFor="UserName"
                            className="col-3 col-form-label"
                          >
                            User Name: -
                          </label>
                          <div className="col-9">
                            <input
                              type="text"
                              className="form-control"
                              id="UserName"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row">
                          <label htmlFor="Bio" className="col-3 col-form-label">
                            Bio: -
                          </label>
                          <div className="col-9">
                            <textarea
                              className="form-control"
                              id="Bio"
                              rows="3"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: "#00425A", color: "#F1F1F1" }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
