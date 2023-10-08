import { Link } from "react-router-dom";
import RecipeImg from "../assets/club-sandwich.jpg";
import ProfilePicture from "../assets/Profile.png";

import { FaHeart } from "react-icons/fa";

const RecipeDetail = () => {
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
                  src={ProfilePicture}
                  alt="Profile"
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
                <h6 className="m-0 ms-2">Sanjeev Kapoor</h6>
              </div>
            </Link>
            <h2 className="m-0 align-self-end" style={{ color: "#FC7300" }}>
              Club Sandwich
            </h2>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="card text-bg-dark border border-0">
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
          </div>
          <div className="p-3 my-2" style={{ backgroundColor: "#FC7300" }}>
            <h3 style={{ color: "#F1F1F1" }}>Ingredients :-</h3>
            <span>
              <ul>
                <li>3 pieces sliced bread Butter, softened</li>
                <li>3 tbsp. mayonnaise Romaine</li>
                <li>2 tomato slices Kosher salt</li>
                <li>Freshly ground black pepper</li>
                <li>2 pieces bacon, cooked</li>
                <li>1 thick slice cheddar</li>
                <li>2 slices turkey</li>
                <li>2 slices ham</li>
              </ul>
            </span>
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-3 h-100" style={{ backgroundColor: "#00425A" }}>
            <div className="d-flex justify-content-between align-items-start">
              <h3 style={{ color: "#FC7300" }}>Recipe :-</h3>
              <div>
                <span
                  className="badge rounded-pill fs-6 mx-1"
                  style={{ backgroundColor: "#FC7300" }}
                >
                  Snack
                </span>
                <span
                  className="badge rounded-pill fs-6 mx-1"
                  style={{ backgroundColor: "#FC7300" }}
                >
                  Breakfast
                </span>
              </div>
            </div>
            <ul style={{ color: "#F1F1F1" }}>
              <li>
                Toast bread until golden, then spread a thin layer of butter on
                both sides of every slice.
              </li>
              <li>
                Spread mayonnaise on one side of one slice of bread. Top with
                lettuce and tomato slices, then season lightly with salt and
                pepper. Place bacon slices on top.
              </li>
              <li>
                Spread mayonnaise on both sides of a second piece of bread and
                place on top of bacon. Top with cheddar, turkey, and ham. Spread
                mayonnaise on one side of the last piece of bread and place on
                top of sandwich, mayo side down.
              </li>
              <li> Secure with toothpicks and cut into 4 triangles.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
