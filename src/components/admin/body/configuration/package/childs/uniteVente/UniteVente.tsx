import { FC, ReactElement, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconFi from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../../../../../../../shared/components/alert/ModalConfirm";
import { UNITEVENTE } from "../../../../../../../shared/constant/constant";
import TableSkel from "../../../../../../../shared/skeletor/TableSkel";
import {
  deleteUniteVente,
  retrieveUniteVente,
  selectUniteVentes,
  uniteVenteLoadingDelete,
  uniteVenteLoadingRetrieve,
} from "../../../../../../../slices/uniteVenteSlice";
import { AppDispatch } from "../../../../../../../store";
import uniteVente from "../../../../../../../types/uniteVente/uniteVente";
import ModalNewPackage from "../modalNewPackage/ModalNewPackage";
import ModalUpdatePackage from "../modalUpdatePackage/ModalUpdatePackage";

const UniteVente: FC = (): ReactElement => {
  const [searchUniteVente, setSearchUniteVente] = useState<string>("");

  const loadingRetrieve = useSelector(uniteVenteLoadingRetrieve);
  const loadingDelete = useSelector(uniteVenteLoadingDelete);
  const listUniteVentes = useSelector(selectUniteVentes);

  const [utvIndex, setUtvIndex] = useState<number | null>(null);
  const [idUtvToDelete, setIdUtvToDelete] = useState<number | null>(null);

  const [utvToUpdate, setUtvToUpdate] = useState<uniteVente | null>(null);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [showNewUtv, setShowNewUtv] = useState<boolean>(false);
  const [showUpdateUtv, setShowUpdateUtv] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retrieveUniteVente(searchUniteVente));
  }, [dispatch]);

  const onChangeSearchUniteVente = (e: any) => {
    setSearchUniteVente(e.target.value);
  };

  const deleteUtv = (id: number, index: number): void => {
    setShowModalConfirm(true);
    setIdUtvToDelete(id);
    setUtvIndex(index);
  };

  const onDeleteModalAccept = (): void => {
    setShowModalConfirm(false);
    dispatch(deleteUniteVente(idUtvToDelete!));
  };

  return (
    <div>
      <h5 className="sub-title">
        <IconBs.BsFillCartPlusFill className="me-2" />
        Sales unit
      </h5>

      <div className="d-flex mb-2">
        <button
          className="btn btn-success btn-sm d-flex align-items-middle fs-18 py-0"
          onClick={() => setShowNewUtv(true)}
        >
          <IconFi.FiPlus className="w-100 h-100" />
        </button>

        <div className="input-group input-group-sm ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Sales unit"
            value={searchUniteVente}
            onChange={onChangeSearchUniteVente}
            onKeyDown={(e: any) => {
              if (e.key === "Enter")
                dispatch(retrieveUniteVente(searchUniteVente));
            }}
          />
          <button
            className="input-group-text btn btn-primary"
            type="button"
            onClick={() => dispatch(retrieveUniteVente(searchUniteVente))}
          >
            <IconBs.BsSearch className="w-100 h-100" />
          </button>
        </div>
      </div>

      {!loadingRetrieve ? (
        !listUniteVentes.length ? (
          <p className="result fw-bold text-center pt-1">No results</p>
        ) : (
          <>
            <table className="table table-bordered table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Sales unit</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listUniteVentes
                  .slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize
                  )
                  .map((uniteVente: uniteVente, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row" style={{ verticalAlign: "middle" }}>
                          {uniteVente.id}
                        </th>
                        <td>{uniteVente.utvArt}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-dark-b btn-sm box-sdw rounded-pill me-2"
                            onClick={() => {
                              setShowUpdateUtv(true);
                              setUtvToUpdate(uniteVente);
                            }}
                          >
                            <IconFa.FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm box-sdw rounded-pill"
                            onClick={() => deleteUtv(uniteVente.id, index)}
                          >
                            {loadingDelete && utvIndex === index && (
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
                total={listUniteVentes.length}
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
        show={showNewUtv}
        package={"Sales unit"}
        onHide={() => setShowNewUtv(false)}
      >
        <IconBs.BsFillCartPlusFill />
      </ModalNewPackage>

      {utvToUpdate && (
        <ModalUpdatePackage
          data={utvToUpdate}
          show={showUpdateUtv}
          package={UNITEVENTE}
          onHide={() => {
            setShowUpdateUtv(false);
            setUtvToUpdate(null);
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
        Do you really want to delete this sales unit ?
      </ModalConfirm>
    </div>
  );
};

export default UniteVente;
