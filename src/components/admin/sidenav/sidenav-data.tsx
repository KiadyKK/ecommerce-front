import { ReactElement } from "react";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconTi from "react-icons/ti";

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
    icon: <IconTi.TiGroup className="sidenav-link-icon me-2" />,
    label: "Staff",
    childs: [
      {
        label: "Confirm",
        link: "staff/confirm",
        icon: <IconBs.BsFillPersonCheckFill className="sidenav-link-icon me-2" />,
      },
      {
        label: "List",
        link: "staff/list",
        icon: <IconFa.FaListUl className="sidenav-link-icon me-2" />,
      },
    ],
  },
  {
    link: "customers",
    icon: <IconBs.BsPersonCircle className="sidenav-link-icon me-2" />,
    label: "Customers",
  },
  {
    link: "staff1",
    icon: <IconBs.BsPersonCircle className="sidenav-link-icon me-2" />,
    label: "Staff1",
    childs: [
      {
        label: "Confirm1",
        link: "staff/confirm1",
        icon: <IconBs.BsPersonCircle className="sidenav-link-icon me-2" />,
      },
    ],
  },
];
