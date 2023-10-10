import { useContext, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { ProfileContext } from "../context/Profile/ProfileContext";

const Home = () => {
  const { getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="row py-2">
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <RecipeCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
