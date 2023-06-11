import React, { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  deletePerson,
  getPersons,
  updatePending,
} from "../../../../../store/actions/personsActions";
import { personsPendingSelector } from "../../../../../store/selectors/staffSelectors";
import useRoute from "../../hookCreated/useRoute";

const Confirm = () => {
  const [route] = useRoute(useLocation());
  const dispatch = useDispatch();
  const persons = useSelector(personsPendingSelector);

  useEffect(() => {
    dispatch(getPersons("", ""));
  }, [dispatch]);

  return (
    <div className="h-100 container-fluid px-2">
      <div className="admin-menu-title bg-light">
        <h4>Confirm member</h4>
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
      {persons.length !== 0 ? (
        <div className="bg-light py-3 px-3">
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
              {persons.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="pt-2">{item.username}</td>
                    <td className="pt-2">{item.email}</td>
                    <td className="pt-2">{item.FKroles}</td>
                    <td className="d-flex">
                      <button
                        className="btn btn-success btn-sm circle-button me-2"
                        onClick={() => dispatch(updatePending(item.idPers))}
                      >
                        <Icon.PersonCheck className="h-100 w-100" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm circle-button"
                        onClick={() => dispatch(deletePerson(item.idPers))}
                      >
                        <Icon.Trash className="h-100 w-100" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-light px-3 pt-2 d-flex justify-content-center fw-bold">
          <p>No Results</p>
        </div>
      )}
    </div>
  );
};

export default Confirm;
