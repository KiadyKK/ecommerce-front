import { ReactElement } from "react";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconTi from "react-icons/ti";
import * as IconFi from "react-icons/fi";
import * as IconTb from "react-icons/tb";
import * as IconAi from "react-icons/ai";

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
        icon: (
          <IconBs.BsFillPersonCheckFill className="sidenav-link-icon me-2" />
        ),
      },
      {
        label: "List",
        link: "staff/list",
        icon: <IconFa.FaListUl className="sidenav-link-icon me-2" />,
      },
    ],
  },
  {
    link: "configuration",
    icon: <IconAi.AiTwotoneSetting className="sidenav-link-icon me-2" />,
    label: "Configuration",
    childs: [
      {
        label: "Package",
        link: "configuration/package",
        icon: <IconFi.FiPackage className="sidenav-link-icon me-2" />,
      },
      {
        label: "Article",
        link: "configuration/article",
        icon: <IconTb.TbReportMoney className="sidenav-link-icon me-2" />,
      },
    ],
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
