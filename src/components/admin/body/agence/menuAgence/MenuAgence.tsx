import { FC, ReactElement, useEffect, useState } from "react";
import "./MenuAgence.scss";
import { NavLink, useParams } from "react-router-dom";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconHi2 from "react-icons/hi2";
import * as AgenceSrvice from "../../../../../services/agence.service";
import { AGENCY } from "../../../../../shared/constant/constant";
import agence from "../../../../../types/agence/agence";

const MenuAgence: FC = (): ReactElement => {
  const { abr } = useParams<string>();
  const [agence, setAgence] = useState<agence | undefined>(undefined);

  useEffect(() => {
    (async function () {
      const res = await AgenceSrvice.getByAbr(abr!);
      setAgence(res.data);
    })();
  }, []);

  return (
    <div className="container-fluid wrap-agence h-100">
      <h3>{AGENCY + " " + agence?.agc}</h3>
      <div className="row d-flex justify-content-center">
        <NavLink
          to={"commande"}
          className="purchase-order d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconHi2.HiClipboardDocumentList className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">Purchase order</h5>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">List</h5>
        </NavLink>

        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">Confirm</h5>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">List</h5>
        </NavLink>
      </div>

      <div className=" row d-flex justify-content-center">
        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">Confirm</h5>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">List</h5>
        </NavLink>

        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">Confirm</h5>
        </NavLink>

        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">List</h5>
        </NavLink>
      </div>

      <div className="d-flex justify-content-center">
        <NavLink
          to={"list"}
          className="staff-list d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconFa.FaListUl className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">List</h5>
        </NavLink>

        <NavLink
          to={"confirm"}
          className="staff-confirm d-flex flex-column justify-content-center align-items-center text-decoration-none"
        >
          <IconBs.BsFillPersonCheckFill className="staff-icon px-3 py-3 w-50 h-50" />
          <h5 className="mt-2">Confirm</h5>
        </NavLink>
      </div>
    </div>
  );
};

export default MenuAgence;
