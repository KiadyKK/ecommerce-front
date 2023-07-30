import { FC, ReactElement, useState } from "react";
import { navbarData, InavbarData } from "./sidenav-data";
import Menu from "./Menu";
import * as Icon from "react-icons/bs";
import "./Sidenav.scss";

type props = {
  onToggleSidenav: (collapse: boolean, screenWidth: number) => void;
};

const Sidenav: FC<props> = (props): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const toggleCollapse = (): void => {
    setCollapsed((collapsed) => !collapsed);
    setScreenWidth(window.innerWidth);
    props.onToggleSidenav(collapsed, screenWidth);
  };

  return (
    <div
      className={`${collapsed ? "sidenav-collapsed" : ""} sidenav`}
      onMouseEnter={toggleCollapse}
      onMouseLeave={toggleCollapse}
    >
      <div className="logo-container">
        <button className="logo" onClick={toggleCollapse}>
          <Icon.BsPersonCircle />
        </button>
        {collapsed && <div className="logo-text">Menu</div>}
      </div>
      <ul className="sidenav-nav">
        {navbarData.map((item: InavbarData, index: number) => {
          return <Menu index={index} menu={item} collapsed={collapsed} key={item.link}></Menu>;
        })}
      </ul>
    </div>
  );
};

export default Sidenav;
