import { FC, useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Logo from "./assets/images/Logo.png";
import Admin from "./components/admin/Admin";
import * as AuthService from "./services/auth.service";

type NavProps = {
  url: string;
  menu: string;
};

const Nav: FC<NavProps> = ({ url, menu }) => {
  return (
    <li className="nav-item mx-4">
      <NavLink to={url} className="nav-link">
        {menu}
      </NavLink>
    </li>
  );
};

const App: FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavCollapse = () =>
    setIsNavCollapsed((isNavCollapsed) => !isNavCollapsed);

  useEffect(() => {
    const user: string | null = AuthService.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate("/home");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4">
        <img src={Logo} alt="logo mern" />
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto">
            <Nav url={"/about"} menu={"About"} />
            <Nav url={"/home"} menu={"Home"} />
            <Nav url={"/shop"} menu={"Shop"} />
            <Nav url={"/promotion"} menu={"Promotion"} />
            <Nav url={"/contact"} menu={"Contact"} />
            {currentUser && <Nav url={"/admin"} menu={"Admin"} />}
          </ul>

          {currentUser ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={"/profile"} className="nav-link me-1">
                  {currentUser.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="log btn btn-primary"
                  onClick={logOut}
                >
                  <Icon.PersonCircle className="me-1" /> Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="log btn btn-outline-primary"
                  onClick={() => setAuthStatus(true)}
                >
                  <Icon.PersonCircle className="me-1" /> Login
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <Auth show={authStatus} onHide={() => setAuthStatus(false)} />

      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
