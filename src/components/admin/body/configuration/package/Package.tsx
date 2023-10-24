import { FC, ReactElement } from "react";
import * as IconFi from "react-icons/fi";
import RouteProgress from "../../../../../shared/components/routeProgress/RouteProgress";
import "./Package.scss";
import Category from "./category/Category";
import Conditionnement from "./conditionnement/Conditionnement";
import UniteVente from "./uniteVente/UniteVente";

const Package: FC = (): ReactElement => {
  
  return (
    <div className="bg px-2">
      <h4 className="pt-2">
        <IconFi.FiPackage className="me-2" />
        Package
      </h4>

      <RouteProgress />

      <div className="row px-2">
        <div className="col-lg-4 px-1">
          <div className="content mb-2">
            <Category />
          </div>
        </div>
        <div className="col-lg-4 px-1">
          <div className="content mb-2">
            <Conditionnement />
          </div>
        </div>
        <div className="col-lg-4 px-1">
          <div className="content mb-2">
            <UniteVente />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
