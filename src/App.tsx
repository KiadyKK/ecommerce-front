import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import * as Icon from "react-icons/bs";
import * as IconMD from "react-icons/md";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.scss";
import Logo from "./assets/images/Logo.png";
import Admin from "./components/admin/Admin";
import Auth from "./components/auth/Auth";
import PrivateRoute from "./guards/privateRoute";
import * as StorageService from "./services/storage.service";
import Toast from "./shared/components/toast/Toast";

type NavProps = PropsWithChildren<{
  url: string;
}>;

const Nav: FC<NavProps> = ({ url, children }): React.ReactElement => {
  return (
    <li className="nav-item mx-4">
      <NavLink to={url} className="nav-link">
        {children}
      </NavLink>
    </li>
  );
};

const App: FC = (): React.ReactElement => {
  const [theme, setTheme] = useState<boolean>(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleNavCollapse = (): void =>
    setIsNavCollapsed((isNavCollapsed) => !isNavCollapsed);

  useEffect(() => {
    const currentUser: string | null = StorageService.getItem("username");
    if (currentUser) {
      setCurrentUser(currentUser);
      setAuthStatus(false);
    }
    setRole(StorageService.getItem("role"));

    if (localStorage.getItem("theme") == "dark") {
      setDarkMode();
      setTheme(true);
    } else {
      setLightMode();
      setTheme(false);
    }
  }, []);

  const logOut = (): void => {
    StorageService.clear();
    setCurrentUser(null);
    navigate("/home");
  };

  const setDarkMode = (): void => {
    document.querySelector("body")!.setAttribute("data-theme", "dark");
  };

  const setLightMode = (): void => {
    document.querySelector("body")!.setAttribute("data-theme", "light");
  };

  const toggleTheme = (): void => {
    theme ? setLightMode() : setDarkMode();
    setTheme((theme) => !theme);
    localStorage.setItem("theme", theme ? "light" : "dark");
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-dark fixed-top px-4 nav-menu`}
      >
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
            <Nav url={"/about"}>About</Nav>
            <Nav url={"/home"}>Home</Nav>
            <Nav url={"/shop"}>Shop</Nav>
            <Nav url={"/promotion"}>Promotion</Nav>
            <Nav url={"/contact"}>Contact</Nav>
            {currentUser && role !== "Utilisateur" && (
              <Nav url={"/admin"}>Administration</Nav>
            )}
          </ul>

          <button className="button-menu-toggle" onClick={toggleTheme}>
            {theme ? (
              <IconMD.MdNightlight className="menu-toggle" />
            ) : (
              <IconMD.MdLightMode className="menu-toggle" />
            )}
          </button>

          {currentUser ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to={"/profile"} className="nav-link me-1">
                  {currentUser}
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="log btn btn-outline-primary"
                  onClick={logOut}
                >
                  <Icon.BsPersonCircle className="me-1" /> Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="log btn btn-primary"
                  onClick={() => setAuthStatus(true)}
                >
                  <Icon.BsPersonCircle className="me-1" /> Login
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <Auth show={authStatus} onHide={() => setAuthStatus(false)} />

      <div className="body">
        <SkeletonTheme baseColor="rgb(78, 85, 110)" highlightColor="#0d6efd">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Home />} />
            <Route path="/profile" element={<Profile />} /> */}
            <Route element={<PrivateRoute />}>
              <Route path="/admin/*" element={<Admin />} />
            </Route>
            <Route path="/" element={<Navigate to={"/home"} />} />
          </Routes>{" "}
        </SkeletonTheme>
      </div>

      <Toast />
    </div>
  );
};

export default App;
