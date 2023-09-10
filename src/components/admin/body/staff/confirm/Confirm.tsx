import { FC, ReactElement, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import * as IconBs from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import RouteProgress from "../../../../../shared/routeProgress/RouteProgress";
import TableSkel from "../../../../../shared/skeletor/TableSkel";
import CustomModal from "../../../../../shared/components/alert/ModalConfirm";
import {
  personnesLoading,
  personneUpdateLoading,
  personneDeleteLoading,
  personnesPending,
  retrivePersonnes,
  updatePending,
  personneError,
  deletePersonne,
} from "../../../../../slices/personneSlice";
import {
  retriveRoles,
  roles,
  rolesLoading,
} from "../../../../../slices/roleSlice";
import { AppDispatch } from "../../../../../store";
import Ipersonne1 from "../../../../../types/personne/personne1";
import Irole from "../../../../../types/role/role";
import "./Confirm.scss";

const Confirm: FC = (): ReactElement => {
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [searchRole, setSearchRole] = useState<string>("");

  const listRole: Irole[] = useSelector(roles);
  const listRoleLoading: boolean = useSelector(rolesLoading);

  const listPersonne: Ipersonne1[] = useSelector(personnesPending);
  const listPersonneLoading: boolean = useSelector(personnesLoading);
  const persUpdateLoading: boolean = useSelector(personneUpdateLoading);
  const persDeleteLoading: boolean = useSelector(personneDeleteLoading);
  const persError: string = useSelector(personneError);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  const [persIndex, setPersIndex] = useState<number | null>(null);
  const [idPersToDelete, setIdPersToDelete] = useState<number | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retriveRoles());
    dispatch(retrivePersonnes({ searchUsername, searchRole }));
  }, [dispatch]);

  const onChangeSearchUsername = (e: any) => {
    setSearchUsername(e.target.value);
  };

  const onChangeSearchRole = (e: any): void => {
    const searchRole: string = e.target.value === "Tous" ? "" : e.target.value;
    setSearchRole(searchRole);
    const data = {
      searchUsername: searchUsername,
      searchRole: searchRole,
    };
    dispatch(retrivePersonnes(data));
  };

  const deletePers = (id: number, index: number): void => {
    setShowModal(true);
    setIdPersToDelete(id);
    setPersIndex(index);
  };

  const onDeleteModalAccept = (): void => {
    setShowModal(false);
    dispatch(deletePersonne(idPersToDelete!));
  };

  if (persError !== "") alert(persError);

  return (
    <div className="bg px-2">
      <h4 className="pt-2">
        <IconBs.BsFillPersonCheckFill className="me-2" />
        Confirm person
      </h4>

      <RouteProgress />

      <div className="content">
        <div className="d-flex justify-content-end mb-2">
          {!listRoleLoading ? (
            <select
              className="form-select form-select-sm ms-auto"
              aria-label=".form-select-sm example"
              onChange={onChangeSearchRole}
              defaultValue=""
              required
            >
              <option value="" disabled hidden>
                Role
              </option>
              {listRole?.map((role: Irole, index: number) => {
                return (
                  role.role !== "Administrateur" && (
                    <option key={index} value={role.role}>
                      {role.role}
                    </option>
                  )
                );
              })}
              <option className="separator" disabled></option>
              <option value="Tous">Tous</option>
            </select>
          ) : (
            <Skeleton className="select-skel" />
          )}

          <div className="input-group input-group-sm ms-2">
            <input
              type="text"
              className="form-control h-100"
              placeholder="Username"
              value={searchUsername}
              onChange={onChangeSearchUsername}
              onKeyDown={(e: any) => {
                if (e.key === "Enter")
                  dispatch(retrivePersonnes({ searchUsername, searchRole }));
              }}
            />
            <button
              className="input-group-text btn btn-primary h-100"
              type="button"
              onClick={() =>
                dispatch(retrivePersonnes({ searchUsername, searchRole }))
              }
            >
              <IconBs.BsSearch className="w-100 h-100" />
            </button>
          </div>
        </div>

        {!listPersonneLoading ? (
          !listPersonne.length ? (
            <p className="result fw-bold text-center pt-1">No results</p>
          ) : (
            <>
              <table className="table table-bordered table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listPersonne
                    .slice(
                      (page - 1) * pageSize, //0   1
                      (page - 1) * pageSize + pageSize //1   2
                    )
                    .map((personne: Ipersonne1, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row" style={{ verticalAlign: "middle" }}>
                            {personne.id}
                          </th>
                          <td>{personne.username}</td>
                          <td>{personne.email}</td>
                          <td>{personne.role?.role}</td>
                          <td>
                            <div className="text-center">
                              <button
                                className="btn btn-success btn-sm rounded-pill me-2"
                                onClick={() => {
                                  dispatch(updatePending(personne.id!));
                                  setPersIndex(index);
                                }}
                              >
                                {persUpdateLoading && persIndex === index && (
                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                )}
                                <IconBs.BsFillPersonCheckFill />
                              </button>
                              <button
                                className="btn btn-danger btn-sm rounded-pill"
                                onClick={() => deletePers(personne.id!, index)}
                              >
                                {persDeleteLoading && persIndex === index && (
                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                )}
                                <IconBs.BsFillTrash3Fill />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <div className="d-flex">
                <PaginationControl
                  last
                  page={page}
                  // between={2}
                  total={listPersonne.length}
                  limit={pageSize}
                  changePage={(page) => {
                    setPage(page);
                  }}
                  // ellipsis={1}
                />

                <select
                  style={{ maxWidth: "70px" }}
                  className="form-select form-select-sm ms-auto"
                  aria-label=".form-select-sm example"
                  onChange={(e: any) => {
                    setPageSize(+e.target.value);
                    setPage(1);
                  }}
                  defaultValue="4"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </>
          )
        ) : (
          <TableSkel col={5} row={5} />
        )}
      </div>

      <CustomModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        onAccept={onDeleteModalAccept}
      >
        Do you really want to delete this person ?
      </CustomModal>
    </div>
  );
};

export default Confirm;
