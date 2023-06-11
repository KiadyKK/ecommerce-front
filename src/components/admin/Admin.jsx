import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Admin.css";
import Articles from "./adminChilds/configuration/articles/Articles";
import Configuration from "./adminChilds/configuration/Configuration";
import Details from "./adminChilds/configuration/details/Details";
import Customers from "./adminChilds/customers/Customers";
import Confirm from "./adminChilds/staff/confirm/Confirm";
import List from "./adminChilds/staff/list/List";
import Staff from "./adminChilds/staff/Staff";
import SideBar from "./sidebar/SideBar";

const Admin = () => {
  return (
    <div className="containers">
      <div className="left bg-dark">
        <SideBar />
      </div>
      <div className="right">
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/confirm" element={<Confirm />} />
          <Route path="/staff/list" element={<List />} />
          <Route path="/config" element={<Configuration />} />
          <Route path="/config/details" element={<Details />} />
          <Route path="/config/articles" element={<Articles />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
