import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import ProfilePicture from "../assets/ProfilePicture.jpg";
import { AuthContext } from "../context/Auth/AuthContext";

const Navbar = () => {
  const { LogOut, user } = useContext(AuthContext);

  const [showSearch, setShowSearch] = useState(false);

  const UserLogOut = async (e) => {
    e.preventDefault();
    await LogOut();
  };

  return (
    <div className="sticky-top">
      <nav
        className="navbar navbar-expand-lg"
        data-bs-theme="dark"
        style={{ backgroundColor: "#00425A" }}
      >
        <div className="container">
          <Link
            className="navbar-brand"
            to="/home"
            style={{
              fontFamily: "Fredoka One",
              fontSize: "25px",
              fontWeight: 600,
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              width="40"
              height="25"
              className="d-inline-block align-text-top"
            />
            Food<span style={{ color: "#FC7300" }}>Book</span>
          </Link>
          {/* Search */}
          <form className="d-sm-flex d-none mx-auto input-group w-50">
            <input
              className="form-control rounded-start-pill border-0"
              style={{ backgroundColor: "#F1F1F1", color: "black" }}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn border-0 rounded-end-pill px-4 "
              style={{ backgroundColor: "#FC7300", color: "#F1F1F1" }}
              type="submit"
            >
              <FaSearch />
            </button>
          </form>
          <div>
            <button
              className="d-sm-none d-inline-block btn btn-sm border-0 rounded-circle m-2"
              style={{
                backgroundColor: "#FC7300",
                color: "#F1F1F1",
                width: "40px",
                height: "40px",
              }}
              type="button"
              onClick={() =>
                showSearch ? setShowSearch(false) : setShowSearch(true)
              }
            >
              <FaSearch />
            </button>
            {/* Profile Picture */}
            {user && (
              <div>
                <Link to="/Profile">
                  <img
                    src={ProfilePicture}
                    alt="Profile"
                    width="40"
                    height="40"
                    className="rounded-circle ms-auto m-2"
                  />
                </Link>
                <Link to="/">
                  <FiLogOut
                    size={30}
                    className="text-white"
                    onClick={UserLogOut}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <form
        className={`d-sm-none ${
          showSearch ? "d-flex" : "d-none"
        }  mx-auto slide-in input-group w-100 p-2`}
      >
        <input
          className="form-control border-0"
          style={{ backgroundColor: "#9EA4A6", color: "black" }}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    </div>
  );
};

export default Navbar;
