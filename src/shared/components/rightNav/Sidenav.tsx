import { FC, ReactElement, useState } from "react";
import { InavbarData } from "./Menu";
import Menu from "./Menu";
import * as IconAi from "react-icons/ai";
import "./Sidenav.scss";

type props = {
  onToggleSidenav: (collapse: boolean, screenWidth: number) => void;
  navbarData: InavbarData[];
};

const Sidenav: FC<props> = ({ onToggleSidenav, navbarData }): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const toggleCollapse = (): void => {
    setCollapsed((collapsed) => !collapsed);
    setScreenWidth(window.innerWidth);
    onToggleSidenav(collapsed, screenWidth);
  };

  return (
    <div
      className={`${collapsed ? "sidenav-collapsed" : ""} sidenav-right`}
      onMouseEnter={toggleCollapse}
      onMouseLeave={toggleCollapse}
    >
      <div className="logo-container">
        <button className="logo" onClick={toggleCollapse}>
          <IconAi.AiOutlineMenu />
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
