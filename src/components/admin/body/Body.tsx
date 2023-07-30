import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import "./Body.scss";
import Staff from "./staff/Staff";

type props = {
  collapsed: boolean;
  screenWidth: number;
};

const Body: FC<props> = ({ collapsed, screenWidth }): ReactElement => {
  const getBodyClass = (): string => {
    let styleClass = "";
    if (!collapsed && screenWidth > 768) {
      styleClass = "body-trimmed";
    } else if (!collapsed && screenWidth <= 768 && screenWidth > 0) {
      styleClass = "body-md-screen";
    }
    return styleClass;
  };

  return (
    <div className={`${getBodyClass()} body-admin`}>
      <Routes>
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </div>
  );
};

export default Body;
