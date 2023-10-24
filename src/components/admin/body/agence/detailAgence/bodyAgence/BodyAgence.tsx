import { FC, ReactElement } from "react";
import "./BodyAgence.scss";
import BonComApp from "./bonComApp/BonComApp";
import { Routes, Route } from "react-router-dom";

type props = {
  collapsed: boolean;
  screenWidth: number;
};

const BodyAgence: FC<props> = ({ collapsed, screenWidth }): ReactElement => {
  const getBodyClass = (): string => {
    let styleClass = "";
    if (!collapsed && screenWidth > 768) {
      styleClass = "body-trimmed-agence";
    } else if (!collapsed && screenWidth <= 768 && screenWidth > 0) {
      styleClass = "body-md-screen-agence";
    }
    return styleClass;
  };

  return (
    <div className={`${getBodyClass()} body-agence`}>
      <Routes>
        <Route path="commande" element={<BonComApp />} />
      </Routes>
    </div>
  );
};

export default BodyAgence;
