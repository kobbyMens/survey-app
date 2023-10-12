import "./home.css";
import MyNavMenu from "../materialUIComponents/MyNavMenu";
import MyNavTabs from "./MyNavTab";
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
          {/* Sidebar */}
          <div className="sidebar">
            <h2>Create new survey</h2>
          </div>
          {/* Main content display area */}
          <div className="main-content">
            <h1>This is where the main section will be</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
