import { ReactElement } from "react";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconTi from "react-icons/ti";
import * as IconFi from "react-icons/fi";
import * as IconTb from "react-icons/tb";
import * as IconAi from "react-icons/ai";
import * as IconHi2 from "react-icons/hi2";
import { InavbarData } from "../../../../../../shared/components/rightNav/Menu";

export const navbarData: InavbarData[] = [
  {
    link: "commande",
    icon: <IconHi2.HiClipboardDocumentList className="sidenav-link-icon me-2" />,
    label: "Purchase order",
  },
  {
    link: "configuration",
    icon: <IconAi.AiTwotoneSetting className="sidenav-link-icon me-2" />,
    label: "Configuration",
  },
  {
    link: "agence",
    icon: <IconHi2.HiHome className="sidenav-link-icon me-2" />,
    label: "Agency",
  },
];
