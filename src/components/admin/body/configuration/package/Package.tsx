import { FC, ReactElement } from "react";
import "./Package.scss";
import * as IconBs from "react-icons/bs";
import * as IconFi from "react-icons/fi";
import RouteProgress from "../../../../../shared/routeProgress/RouteProgress";
import Category from "./childs/category/Category";

const Package: FC = (): ReactElement => {
  return (
    <div className="bg px-2">
      <h4 className="pt-2">
        <IconFi.FiPackage className="me-2" />
        Package
      </h4>

      <RouteProgress />

      <div className="row px-2">
        <div className="col-md-4 px-1">
          <div className="content mb-2">
            <Category />
          </div>
        </div>
        <div className="col-md-4 px-1">
          <div className="content mb-2">
            <h5 className="sub-title">
              <IconBs.BsFillBoxSeamFill className="me-2" />
              Conditioning
            </h5>
          </div>
        </div>
        <div className="col-md-4 px-1">
          <div className="content mb-2">
            <h5 className="sub-title">
              <IconBs.BsFillCartPlusFill className="me-2" />
              Sales unit
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
