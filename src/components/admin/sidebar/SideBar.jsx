import React, { useState } from "react";
import { SideBarData } from "./SideBarData";
import { NavLink } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import $ from "jquery";
import "./SideBar.css";

const SubMenu = ({ subMenu }) => {
  return (
    <ul className="submenu">
      {subMenu.map((item, index) => {
        return (
          <li className="nav-menu-items" key={index}>
            <NavLink className="sub-item align-items-center" to={item.path}>
              {item.icon}
              <span className="item-title">{item.title}</span>
              <span className="bar ms-auto"></span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

const Menu = ({ index, menu }) => {
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(false);
  const onSubMenuHide = () => {
    setIsSubMenuCollapsed(!isSubMenuCollapsed);
    if ($(".submenu").eq(index).is(":visible")) {
      $(".submenu")
        .eq(index)
        .hide({ queue: true })
        .animate({ height: "-=100%" }, 200);
    } else {
      $(".submenu")
        .eq(index)
        .animate({ height: "auto" }, 200)
        .show({ queue: true });
    }
  };

  return (
    <>
      <li className="nav-menu-items d-flex mt-2 mb-1">
        <NavLink className="item align-items-center" to={menu.path}>
          {menu.icon}
          <span className="item-title">{menu.title.toUpperCase()}</span>
        </NavLink>
        <button
          className="button-nav-child container-fluid text-end"
          onClick={onSubMenuHide}
        >
          {isSubMenuCollapsed ? (
            <Icon.ChevronLeft className="icon-nav-side" />
          ) : (
            <Icon.ChevronDown className="icon-nav-side" />
          )}
        </button>
      </li>
      <SubMenu subMenu={menu.childs} />
    </>
  );
};

const SideBar = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const onMenuHide = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
    if ($(".item-title").is(":visible")) {
      $(".bar, .item-title, .button-nav-child")
      .hide({ queue: true })
      .animate({ width: "-=100%" }, 200);
    } else {
      $(".bar, .item-title, .button-nav-child")
        .animate({ width: "+=70%" }, 100)
        .show({ queue: true });
    }
  };

  return (
    <nav>
      <li className="nav-menu-items d-flex justify-content-end">
        <button className="button-menu-toggle" onClick={onMenuHide}>
          {isMenuCollapsed ? (
            <Icon.Toggle2Off className="menu-toggle" />
          ) : (
            <Icon.Toggle2On className="menu-toggle" />
          )}
        </button>
      </li>
      {SideBarData.map((item, index) => {
        return <Menu key={index} index={index} menu={item} />;
      })}
    </nav>
  );
};

export default SideBar;
