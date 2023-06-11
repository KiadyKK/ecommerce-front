import React from "react";
import * as Icon from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import "./Configuration.css";

const Configuration = () => {
  return (
    <div className="container-fluid h-100">
      <div className="wrap-config my-3 mx-1 row h-100 d-flex align-items-center">
        <div className="col-md-6">
          <NavLink
            to={"details"}
            className="config-details mx-auto d-flex flex-column justify-content-center align-items-center text-decoration-none"
          >
            <Icon.Pen className="details-icon px-3 py-3 w-50 h-50" />
            <h2 className="mt-2">Détails</h2>
          </NavLink>
        </div>
        <div className="col-md-6">
          <NavLink
            to={"articles"}
            className="config-articles mx-auto d-flex flex-column justify-content-center align-items-center text-decoration-none"
          >
            <Icon.Box className="details-icon px-3 py-3 w-50 h-50" />
            <h2 className="mt-2">Articles</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
