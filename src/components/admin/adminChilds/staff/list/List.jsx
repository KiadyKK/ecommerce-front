import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  deletePerson,
  getPersons
} from "../../../../../store/actions/personsActions";
import { personsSelector } from "../../../../../store/selectors/staffSelectors";
import useRoute from "../../hookCreated/useRoute";
import useTable, { TablePage } from "../../hookCreated/useTable";

const List = () => {
  const [route] = useRoute(useLocation());
  const [role, setRole] = useState("Tous");
  const [searchUsername, setSearchUsername] = useState("");
  const dispatch = useDispatch();
  const persons = useSelector(personsSelector);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(persons, page, 9);

  useEffect(() => {
    dispatch(getPersons("", role));
  }, [dispatch, role]);

  const handleSelectRole = async (e) => {
    setRole(e);
  };

  const onChangeSearchUsername = (e) => {
    setSearchUsername(e.target.value);
  };

  return (
    <div className="h-100 container-fluid px-2">
      <div className="admin-menu-title bg-light">
        <h4>List member</h4>
        <h6>
          {route.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.path}
                className="text-capitalize text-decoration-none"
              >
                {index === 0 ? "" + item.title : " > " + item.title}
              </Link>
            );
          })}
        </h6>
      </div>

      <div className="sub-right bg-light py-3 px-3">
        <div className="d-flex mb-3">
          <div className="filter">
            <Icon.PersonWorkspace className="p-1 ps-0 w-100 h-100" />
            <p className="title-filter text-center">Role</p>
          </div>
          <DropdownButton
            className="ms-2"
            title={role}
            id="dropdown-menu-align-right"
            onSelect={handleSelectRole}
            variant="outline-primary"
          >
            <Dropdown.Item eventKey="Administrateur">
              Administrateur
            </Dropdown.Item>
            <Dropdown.Item eventKey="Comptable">Comptable</Dropdown.Item>
            <Dropdown.Item eventKey="Commercial">Commercial</Dropdown.Item>
            <Dropdown.Item eventKey="Magasinier">Magasinier</Dropdown.Item>
            <Dropdown.Item eventKey="User">User</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="Tous">Tous</Dropdown.Item>
          </DropdownButton>
          <div className="d-flex ms-4 me-auto">
            <input
              type="text"
              className="input-search"
              placeholder="Username"
              value={searchUsername}
              onChange={onChangeSearchUsername}
            />
            <button
              className="btn-search"
              type="button"
              onClick={() => dispatch(getPersons(searchUsername, role))}
            >
              <Icon.Search className="w-100 h-100" />
            </button>
          </div>
          <TablePage
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
            fastButton={true}
          />
        </div>
        {persons.length !== 0 ? (
          <table className="table table-sm table-hover table-responsive">
            <thead>
              <tr>
                <td>Username</td>
                <td>Email</td>
                <td>Role</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {slice.map((item, index) => (
                <tr key={index}>
                  <td className="pt-2">{item.username}</td>
                  <td className="pt-2">{item.email}</td>
                  <td className="pt-2">{item.FKroles}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm circle-button"
                      onClick={() => dispatch(deletePerson(item.idPers))}
                    >
                      <Icon.Trash className="h-100 w-100" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="border bg-light px-3 pt-2 d-flex justify-content-center fw-bold">
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
