import { FC, ReactElement } from "react";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Staff.scss";

const Staff: FC = (): ReactElement => {
  
  return (
    <div className="container-fluid h-100">
      <div className="wrap-staff my-3 row h-100 d-flex align-items-center">
        <div className="col-md-6">
          <NavLink
            to={"confirm"}
            className="staff-confirm mx-auto d-flex flex-column justify-content-center align-items-center text-decoration-none"
          >
            <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
            <h2 className="mt-2">Confirm</h2>
          </NavLink>
        </div>
        <div className="col-md-6">
          <NavLink
            to={"list"}
            className="staff-list mx-auto d-flex flex-column justify-content-center align-items-center text-decoration-none"
          >
            <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
            <h2 className="mt-2">List</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Staff;
