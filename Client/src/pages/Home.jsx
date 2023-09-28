import RecipeCard from "../components/RecipeCard";

const Home = () => {
  return (
    <div className="container">
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

export default Home;
