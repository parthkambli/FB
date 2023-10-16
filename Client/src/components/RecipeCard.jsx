import RecipeImg from "../assets/FoodIcon.png";
import ProfilePicture from "../assets/Profile.png";
import { Link } from "react-router-dom";

import {
  FaRegHeart,
  FaRegBookmark,
  FaShare,
  // FaHeart,
  // FaFileExcel,
} from "react-icons/fa";

const RecipeCard = (props) => {
  const { image, title, tags, showUser, recipe } = props;

  // Define a function to restrict the text to a certain number of words
  const restrictText = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(" ") + "...";
    }
    return text;
  };
  return (
    <div
      className="card my-2 border-0 rounded rounded-0"
      style={{ backgroundColor: "#00425A", color: "#F1F1F1", height: "400px" }}
    >
      <div className="card text-bg-dark border border-0 ">
        <Link to="/RecipeDetail" className="text-decoration-none">
          <img
            src={image || RecipeImg}
            className="card-img rounded rounded-0"
            style={{ height: "200px" }}
            alt={title}
          />
        </Link>
      </div>
      <div className="card-img-overlay">
        {tags.map((tag, index) => (
          <span
            className="badge rounded-pill mx-1"
            style={{ backgroundColor: "#FC7300" }}
            key={index}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="card-body">
        <Link to="/RecipeDetail" className="text-decoration-none text-white">
          <h4 className="card-title fw-bold" style={{ color: "#FC7300" }}>
            {title}
          </h4>
          <p className="card-text">{restrictText(recipe, 20)}</p>
        </Link>
      </div>
      <div className="card-footer border-0">
        {showUser ? (
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
        ) : (
          <div className="d-flex justify-content-end align-items-center">
            <span>
              128k
              <FaRegHeart className="ms-1" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
