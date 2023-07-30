import { ReactElement } from "react";
import * as Icon from "react-icons/bs";

export interface InavbarDataChild {
  label: string;
  link: string;
  icon: ReactElement;
}

export interface InavbarData {
  link: string;
  icon: ReactElement;
  label: string;
  childs?: InavbarDataChild[];
}

export const navbarData: InavbarData[] = [
  {
    link: "staff",
    icon: <Icon.BsPersonCircle className="sidenav-link-icon me-2" />,
    label: "Staff",
    childs: [
      {
        label: "Confirm",
        link: "staff/confirm",
        icon: <Icon.BsPersonCircle className="sidenav-link-icon me-2" />,
      },
      {
        label: "List",
        link: "staff/list",
        icon: <Icon.BsPersonCircle className="sidenav-link-icon me-2" />,
      },
    ],
  },
  {
    link: "customers",
    icon: <Icon.BsPersonCircle className="sidenav-link-icon me-2" />,
    label: "Customers",
  },
  {
    link: "staff1",
    icon: <Icon.BsPersonCircle className="sidenav-link-icon me-2" />,
    label: "Staff1",
    childs: [
      {
        label: "Confirm1",
        link: "staff/confirm1",
        icon: <Icon.BsPersonCircle className="sidenav-link-icon me-2" />,
      },
    ],
  },
];
