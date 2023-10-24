import { FC, ReactElement } from "react";
import "./DetailAgence.scss";
import { NavLink } from "react-router-dom";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";

const DetailAgence: FC = (): ReactElement => {
  return (
    <div className="container-fluid wrap-agence py-5 h-100">
      <div className="row d-flex justify-content-center">
        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">Confirm</h2>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">List</h2>
        </NavLink>

        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">Confirm</h2>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">List</h2>
        </NavLink>
      </div>

      <div className=" row d-flex justify-content-center">
        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">Confirm</h2>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">List</h2>
        </NavLink>

        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">Confirm</h2>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">List</h2>
        </NavLink>
      </div>

      <div className="d-flex justify-content-center">
        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">List</h2>
        </NavLink>

        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h2 className="mt-2">Confirm</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default DetailAgence;
