import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import "./Body.scss";
import Agence from "./agence/Agence";
import Configuration from "./configuration/Configuration";
import Package from "./configuration/package/Package";
import Article from "./configuration/package/article/Article";
import Staff from "./staff/Staff";
import Confirm from "./staff/confirm/Confirm";
import ListPers from "./staff/listPers/ListPers";
import DetailAgence from "./agence/detailAgence/DetailAgence";

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
        <Route path="staff" element={<Staff />} />
        <Route path="staff/confirm" element={<Confirm />} />
        <Route path="staff/list" element={<ListPers />} />

        <Route path="configuration" element={<Configuration />} />
        <Route path="configuration/package" element={<Package />} />
        <Route path="configuration/article" element={<Article />} />

        <Route path="agence" element={<Agence />} />
        <Route path="agence/detail/:abr" element={<DetailAgence />} />
      </Routes>
    </div>
  );
};

export default Body;
