import React, { FC, ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import { InavbarData, InavbarDataChild } from "./sidenav-data";
import * as Icon from "react-icons/bs";

type props = {
  index: number;
  menu: InavbarData;
  collapsed: boolean;
};

const Menu: FC<props> = ({ index, menu, collapsed }): ReactElement => {
  const [childCollapsed, setChildCollapsed] = useState<boolean>(false);

  const toggleChildCollapse = (): void => {
    setChildCollapsed((childCollapsed) => !childCollapsed);
  };

  return (
    <div className="w-100" onMouseEnter={toggleChildCollapse}
          onMouseLeave={toggleChildCollapse}>
      <li
        key={index}
        className="sidenav-nav-item"
        // onClick={toggleChildCollapse}
      >
        <NavLink className="sidenav-nav-link" to={menu.link}>
          {menu.icon}
          {collapsed && (
            <>
              <span className="sidenav-link-text fs-16">{menu.label}</span>
              {menu.childs && (
                <span className="btn-chevron">
                  {childCollapsed ? (
                    <Icon.BsChevronUp />
                  ) : (
                    <Icon.BsChevronDown />
                  )}
                </span>
              )}
            </>
          )}
        </NavLink>
      </li>

      <div
        className={`sidenav-nav-child p-0 ${
          childCollapsed ? "sidenav-nav-child-collapsed" : ""
        }`}
      >
        {menu.childs?.map((child: InavbarDataChild, index: number) => {
          return (
            <li key={index} className="sidenav-nav-child-item">
              <NavLink className="sidenav-nav-link" to={child.link}>
                {child.icon}
                {collapsed && (
                  <span className="sidenav-link-text fs-14">{child.label}</span>
                )}
              </NavLink>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Menu);
