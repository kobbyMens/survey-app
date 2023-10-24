import "./home.css";
import MyNavMenu from "../materialUIComponents/MyNavMenu";
import MyNavTabs from "./MyNavTab";
import { Outlet } from "react-router-dom";
const Home: React.FC = () => {
  return (
    <>
      <div id="homepage-container">
        {/* Navigation header */}
        <header id="navbar">
          {/* Nav Tabs */}
          <span className="header-section section-1">
            <MyNavTabs />
          </span>

          {/* Icon Tabs  */}
          <span className="header-section section-2">
            <MyNavMenu />
          </span>
        </header>

        {/* Main body*/}
        <div id="main-section">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
