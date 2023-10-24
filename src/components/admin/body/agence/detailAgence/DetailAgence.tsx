import { FC, ReactElement, useEffect, useState } from "react";
import Sidenav from "../../../../../shared/components/rightNav/Sidenav";
import BodyAgence from "./bodyAgence/BodyAgence";
import { navbarData } from "./navDataAgence/sidenav-data";

const DetailAgence: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const onToggleSidenav = (collapse: boolean, screenWidth: number): void => {
    setScreenWidth(screenWidth);
    setCollapsed(collapse);
  };

  return (
    <>
      <BodyAgence collapsed={collapsed} screenWidth={screenWidth}></BodyAgence>
      <Sidenav navbarData={navbarData} onToggleSidenav={onToggleSidenav}></Sidenav>
    </>
  );
};

export default DetailAgence;
