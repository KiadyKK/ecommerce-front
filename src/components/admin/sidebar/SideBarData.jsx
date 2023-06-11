import React from "react";
import * as Icon from "react-bootstrap-icons";

export const SideBarData = [
  {
    title: "Staff",
    path: "staff",
    icon: <Icon.Person className="icon-nav me-2" />,
    childs: [
      {
        title: "Confirm",
        path: "staff/confirm",
        icon: <Icon.PersonCheck className="icon-nav me-2" />,
      },
      {
        title: "List",
        path: "staff/list",
        icon: <Icon.ListUl className="icon-nav me-2" />,
      },
    ],
  },
  {
    title: "Customers",
    path: "customers",
    icon: <Icon.PersonBoundingBox className="icon-nav me-2" />,
    childs: [
      {
        title: "21 Staff",
        path: "/staff",
        icon: <Icon.Person className="icon-nav me-2" />,
      },
      {
        title: "Unité de vente",
        path: "/staff",
        icon: <Icon.Person className="icon-nav me-2" />,
      },
    ],
  },
  {
    title: "Supplers",
    path: "supplier",
    icon: <Icon.PersonHeart className="icon-nav me-2" />,
    childs: [
      {
        title: "31 Staff",
        path: "/staff",
        icon: <Icon.Person className="icon-nav me-2" />,
      },
      {
        title: "32 Staff",
        path: "/staff",
        icon: <Icon.Person className="icon-nav me-2" />,
      },
    ],
  },
  {
    title: "Configuration",
    path: "config",
    icon: <Icon.GearWide className="icon-nav me-2" />,
    childs: [
      {
        title: "Détails",
        path: "config/details",
        icon: <Icon.Pen className="icon-nav me-2" />,
      },
      {
        title: "Articles",
        path: "config/articles",
        icon: <Icon.Box className="icon-nav me-2" />,
      },
    ],
  },
];
