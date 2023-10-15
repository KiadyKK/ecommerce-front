import { FC, ReactElement, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconFi from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../../../../../../../shared/components/modalConfirm/ModalConfirm";
import { CONDITIONNEMENT } from "../../../../../../../shared/constant/constant";
import TableSkel from "../../../../../../../shared/skeletor/TableSkel";
import {
  conditionnementLoadingDelete,
  conditionnementLoadingRetrieve,
  deleteConditionnement,
  retrieveConditionnement,
  selectConditionnements,
} from "../../../../../../../slices/conditionnementSlice";
import { AppDispatch } from "../../../../../../../store";
import conditionnement from "../../../../../../../types/conditionnement/conditionnement";
import ModalNewPackage from "../modalNewPackage/ModalNewPackage";
import ModalUpdatePackage from "../modalUpdatePackage/ModalUpdatePackage";
import "./Conditionnement.scss";

const Conditionnement: FC = (): ReactElement => {
  const [searchConditionnement, setSearchConditionnement] =
    useState<string>("");

  const loadingRetrieve = useSelector(conditionnementLoadingRetrieve);
  const loadingDelete = useSelector(conditionnementLoadingDelete);
  const listConditionnements = useSelector(selectConditionnements);

  const [condIndex, setCondIndex] = useState<number | null>(null);
  const [idCondToDelete, setIdCondToDelete] = useState<number | null>(null);

  const [conditionnementToUpdate, setConditionnementToUpdate] =
    useState<conditionnement | null>(null);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [showNewCond, setShowNewCond] = useState<boolean>(false);
  const [showUpdateCond, setShowUpdateCond] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retrieveConditionnement(searchConditionnement));
  }, [dispatch]);

  const onChangeSearchConditionnement = (e: any) => {
    setSearchConditionnement(e.target.value);
  };

  const deleteCond = (id: number, index: number): void => {
    setShowModalConfirm(true);
    setIdCondToDelete(id);
    setCondIndex(index);
  };

  const onDeleteModalAccept = (): void => {
    setShowModalConfirm(false);
    dispatch(deleteConditionnement(idCondToDelete!));
  };

  return (
    <div>
      <h5 className="sub-title">
        <IconBs.BsFillBoxSeamFill className="me-2" />
        Conditioning
      </h5>

      <div className="d-flex mb-2">
        <button
          className="btn btn-success btn-sm d-flex align-items-middle fs-18 py-0"
          onClick={() => setShowNewCond(true)}
        >
          <IconFi.FiPlus className="w-100 h-100" />
        </button>

        <div className="input-group input-group-sm ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={searchConditionnement}
            onChange={onChangeSearchConditionnement}
            onKeyDown={(e: any) => {
              if (e.key === "Enter")
                dispatch(retrieveConditionnement(searchConditionnement));
            }}
          />
          <button
            className="input-group-text btn btn-primary"
            type="button"
            onClick={() =>
              dispatch(retrieveConditionnement(searchConditionnement))
            }
          >
            <IconBs.BsSearch className="w-100 h-100" />
          </button>
        </div>
      </div>

      {!loadingRetrieve ? (
        !listConditionnements.length ? (
          <p className="result fw-bold text-center pt-1">No results</p>
        ) : (
          <>
            <table className="table table-bordered table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Conditionnement</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listConditionnements
                  .slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize
                  )
                  .map((conditionnement: conditionnement, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row" style={{ verticalAlign: "middle" }}>
                          {conditionnement.id}
                        </th>
                        <td>{conditionnement.condArt}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-dark-b btn-sm box-sdw rounded-pill me-2"
                            onClick={() => {
                              setShowUpdateCond(true);
                              setConditionnementToUpdate(conditionnement);
                            }}
                          >
                            <IconFa.FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm box-sdw rounded-pill"
                            onClick={() =>
                              deleteCond(conditionnement.id, index)
                            }
                          >
                            {loadingDelete && condIndex === index && (
                              <span className="spinner-border spinner-border-sm me-1"></span>
                            )}
                            <IconBs.BsFillTrash3Fill />
                          </button>
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
                total={listConditionnements.length}
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
                defaultValue="5"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </>
        )
      ) : (
        <TableSkel col={3} row={5} />
      )}

      <ModalNewPackage
        show={showNewCond}
        package={"Conditionnement"}
        onHide={() => setShowNewCond(false)}
      >
        <IconBs.BsFillBoxSeamFill />
      </ModalNewPackage>

      {conditionnementToUpdate && (
        <ModalUpdatePackage
          data={conditionnementToUpdate}
          show={showUpdateCond}
          package={CONDITIONNEMENT}
          onHide={() => {
            setShowUpdateCond(false);
            setConditionnementToUpdate(null);
          }}
        >
          <IconBs.BsFillBoxSeamFill />
        </ModalUpdatePackage>
      )}

      <ModalConfirm
        show={showModalConfirm}
        onHide={() => {
          setShowModalConfirm(false);
        }}
        onAccept={onDeleteModalAccept}
      >
        Do you really want to delete this conditionnement ?
      </ModalConfirm>
    </div>
  );
};

export default Conditionnement;
