/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import ProfilePicture from "../assets/Profile.png";
import RecipeCard from "../components/RecipeCard";
import { imageToBase64 } from "../utils/ImageUtils";
// import { AuthContext } from "../context/Auth/AuthContext";
import { ProfileContext } from "../context/Profile/ProfileContext";

const Profile = () => {
  const { user, getProfile, editProfile, error, resetError } =
    useContext(ProfileContext);

  const [profilePicture, setProfilePicture] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    resetError();
    const editedProfile = {
      Full_Name: name,
      User_Name: userName,
      Bio: bio,
      Profile_Picture: profilePicture,
    };
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      resetError();
    }, 3000);
    await editProfile(editedProfile);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Check if a file was selected
    if (!file) {
      setErrorMessage("No file selected.");
      return;
    }

    // Define a maximum file size in bytes (e.g., 600 KB)
    const maxFileSizeBytes = 600 * 1024; // 600 KB

    // Check if the file size exceeds the maximum allowed size
    if (file.size > maxFileSizeBytes) {
      setErrorMessage("File size too large (max: 600 KB)");
      return;
    }

    // If the file size is within the allowed limit, proceed with uploading the file
    const base64 = await imageToBase64(file);
    setProfilePicture(base64);

    // Clear any previous error message
    setErrorMessage("");
  };

  return (
    <div className="container">
      <div className="p-2 my-2" style={{ backgroundColor: "#F1F1F1" }}>
        {error && showAlert && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {/* Later place the error in modal */}
        <div className="row p-2">
          <div className="col-md-6">
            <div className="d-flex">
              <img
                src={user.Profile_Picture || ProfilePicture}
                alt="Profile"
                width="200"
                height="200"
                className="rounded-circle"
              />
              <div className="p-3">
                <h2 className="m-0" style={{ color: "#FC7300" }}>
                  {user.User_Name}
                </h2>
                <div>
                  <span className="pe-3">
                    <strong>50</strong> Recipes
                  </span>
                  <span className="pe-3">
                    <strong>50</strong> saved
                  </span>
                </div>
                <h5 style={{ color: "#FC7300" }}>{user.Full_Name}</h5>
                <p>{user.Bio}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-sm rounded-pill m-2"
                data-bs-toggle="modal"
                data-bs-target="#editProfile"
                onClick={() => {
                  setName(user.Full_Name);
                  setUserName(user.User_Name);
                  setBio(user.Bio);
                }}
                style={{ backgroundColor: "#FC7300", color: "#F1F1F1" }}
              >
                Edit Profile
              </button>
              {/* Modal  */}
              <div
                className="modal fade"
                id="editProfile"
                tabIndex="-1"
                aria-labelledby="EditProfile"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div
                    className="modal-content"
                    style={{ backgroundColor: "#F1F1F1" }}
                  >
                    <div
                      className="modal-header"
                      style={{ backgroundColor: "#00425A" }}
                    >
                      <h1
                        className="modal-title fs-5 text-white"
                        id="EditProfile"
                      >
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
                      <form className="p-4" onSubmit={onSubmit}>
                        <div className="row">
                          <div className="col-4">
                            <div className="mb-3">
                              <label
                                htmlFor="ProfilePicture"
                                className="form-label text-center p-0 w-100 h-100 border border-0 custom-img-upload"
                              >
                                <img
                                  className="rounded-circle"
                                  src={user.Profile_Picture || ProfilePicture}
                                  alt=""
                                />
                                <span>Edit Picture</span>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="ProfilePicture"
                                accept=".jpeg, .png, .jpg"
                                // value={name}
                                onChange={(e) => handleImageUpload(e)}
                              />
                              {errorMessage && (
                                <p className="pt-3 text-danger">
                                  {errorMessage}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-8">
                            <div className="mb-3">
                              <label htmlFor="Name" className="form-label">
                                Name:-
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="UserName" className="form-label">
                                User Name: -
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="UserName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="Bio" className="form-label">
                                Bio: -
                              </label>
                              <textarea
                                className="form-control"
                                id="Bio"
                                rows="3"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn button w-100"
                          data-bs-dismiss="modal"
                        >
                          Edit
                        </button>
                      </form>
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
