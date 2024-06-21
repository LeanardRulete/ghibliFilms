import "./main-app.scss";
import { Outlet } from "react-router-dom";
import logo from "../assets/ghibli.png"; // Ensure this path is correct

export function MainApp() {
  return (
    <div>
      <header className="app-header">
        <img src={logo} alt="Ghibli Film Shops Logo" className="logo" />
        Ghibli Film Shops
        <small>The Best Film Ever</small>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default MainApp;
