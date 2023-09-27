import Logo from "../assets/Logo2.png";
import backgroundImage from "../assets/LandingBG.png";
import { useEffect, useState } from "react";

const Landing = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [formShow, setFormShow] = useState("login");

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Get the height of the navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);
  
  return (
    <div
      className="d-flex flex-column justify-content-center py-5 py-md-2 m-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: `calc(100vh - ${navbarHeight}px)`,
      }}
    >
      <div className="row m-0 px-4">
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-center h-100 px-2">
            <div className="text-white">
              <img
                src={Logo}
                alt=""
                className="align-self-start img-fluid"
                style={{ maxHeight: "35%", maxWidth: "35%" }}
              />
              <h2 className="display-4 text-nowrap m-0">Explore & share</h2>
              <h5 className="display-6 text-nowrap">Amazing Recipes</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100 px-lg-4">
            <div
              className="border border-2 w-100"
              style={{ backgroundColor: "rgba(178, 178, 178, 0.5)" }}
            >
              <div className="d-flex justify-content-around border-2 border-bottom">
                <span
                  role="button"
                  className="py-2 border-2 border-end text-center w-100"
                  onClick={() => setFormShow("login")}
                  style={
                    formShow === "login"
                      ? { backgroundColor: "#fc7300", color: "#f1f1f1" }
                      : { backgroundColor: "#f1f1f1", color: "#fc7300" }
                  }
                >
                  <h2 className="m-0">Login</h2>
                </span>
                <span
                  role="button"
                  className="py-2 text-center w-100"
                  onClick={() => setFormShow("signup")}
                  style={
                    formShow === "signup"
                      ? { backgroundColor: "#fc7300", color: "#f1f1f1" }
                      : { backgroundColor: "#f1f1f1", color: "#fc7300" }
                  }
                >
                  <h2 className="m-0">Signup</h2>
                </span>
              </div>
              {formShow === "login" ? (
                <form className="p-4">
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>

                  <button type="submit" className="btn button w-100">
                    Login
                  </button>
                </form>
              ) : (
                <form className="p-4">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="FullName"
                      placeholder="Full Name"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="UserName"
                      placeholder="User Name"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="ConfirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>

                  <button type="submit" className="btn button w-100">
                    Signup
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
