import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { AuthContext, AuthProvider } from "./context/Auth/AuthContext";
import { useContext } from "react";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/landing" />}
          />
          <Route
            path="/landing"
            element={!user ? <Landing /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
