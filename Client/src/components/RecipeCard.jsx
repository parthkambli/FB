import RecipeImg from "../assets/ChocoLavaCake.jpg";
import ProfilePicture from "../assets/SanjeevKapoor.jpg";
import { Link } from "react-router-dom";

import { FaRegHeart, FaRegBookmark, FaShare, FaHeart } from "react-icons/fa";

const RecipeCard = () => {
  return (
    <div
      className="card my-2 border-0 rounded rounded-0"
      style={{ backgroundColor: "#00425A", color: "#F1F1F1" }}
    >
      <div className="card text-bg-dark border border-0 ">
        <Link to="/RecipeDetail" className="text-decoration-none">
          <img
            src={RecipeImg}
            className="card-img rounded rounded-0"
            alt="..."
          />
          <div className="card-img-overlay">
            <span className="position-absolute bottom-0 end-0 badge p-2">
              128k <FaHeart />
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
        </Link>
      </div>
      <span
        className="position-absolute top-0 end-0 badge rounded-pill m-2"
        style={{ backgroundColor: "#FC7300" }}
      >
        Dessert
      </span>
      <div className="card-body">
        <Link to="/RecipeDetail" className="text-decoration-none text-white">
          <h4 className="card-title fw-bold" style={{ color: "#FC7300" }}>
            Choco Lava Cake
          </h4>
          <p className="card-text">
            Some quick example text to build on the card title and make ...
          </p>
        </Link>
      </div>
      <div className="card-footer border-0">
        <div className="d-flex justify-content-between">
          <Link to="/Profile" className="text-decoration-none text-white">
            <div className="d-flex justify-content-start align-items-center">
              <img
                src={ProfilePicture}
                alt="Profile"
                width="25"
                height="25"
                className="rounded-circle"
              />
              <h6 className="ms-2 m-0 align-self-end">Sanjeev Kapoor</h6>
            </div>
          </Link>
          <div className="d-flex align-items-center">
            <FaRegHeart className="me-1" />
            <FaRegBookmark className="me-1" />
            <FaShare className="me-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
