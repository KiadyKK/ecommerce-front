import { FC, ReactElement, useState } from "react";
import Body from "./body/Body";
import Sidenav from "./sidenav/Sidenav";

const Admin: FC = (): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [bodyClass, setBodyClass] = useState<string>("");

  const onToggleSidenav = (collapse: boolean, screenWidth: number): void => {
    setScreenWidth(screenWidth);
    setCollapsed(collapse);
  };

  return (
    <>
      <Sidenav onToggleSidenav={onToggleSidenav}></Sidenav>
      <Body
        collapsed={collapsed}
        screenWidth={screenWidth}
      ></Body>
    </>
  );
};

export default Admin;
