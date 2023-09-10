import { FC, ReactElement } from "react";
import "./Configuration.scss";
import { NavLink } from "react-router-dom";
import * as IconFi from "react-icons/fi";
import * as IconTb from "react-icons/tb";

const Configuration: FC = (): ReactElement => {
  return (
    <div className="container-fluid h-100">
      <div className="wrap-config my-3 row h-100 d-flex align-items-center">
        <div className="col-md-6">
          <NavLink
            to={"package"}
            className="config-package mx-auto d-flex flex-column justify-content-center align-items-center text-decoration-none"
          >
            <IconFi.FiPackage className="config-icon px-3 py-3 w-50 h-50" />
            <h2 className="mt-2">Package</h2>
          </NavLink>
        </div>
        <div className="col-md-6">
          <NavLink
            to={"article"}
            className="config-article mx-auto d-flex flex-column justify-content-center align-items-center text-decoration-none"
          >
            <IconTb.TbReportMoney className="config-icon px-3 py-3 w-50 h-50" />
            <h2 className="mt-2">Article</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
