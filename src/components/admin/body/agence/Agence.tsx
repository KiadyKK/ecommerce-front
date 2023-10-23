import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactElement, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useForm } from "react-hook-form";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconFi from "react-icons/fi";
import * as IconHi2 from "react-icons/hi2";
import * as IconTi from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import InputModifyValidation from "../../../../shared/components/inputModifyValidation/InputModifyValidation";
import ModalConfirm from "../../../../shared/components/modalConfirm/ModalConfirm";
import RouteProgress from "../../../../shared/components/routeProgress/RouteProgress";
import { AGENCY } from "../../../../shared/constant/constant";
import useChangeInput from "../../../../shared/customHook/useChange";
import TableSkel from "../../../../shared/skeletor/TableSkel";
import {
  agenceLoadingDelete,
  agenceLoadingRetrieve,
  agenceLoadingUpdate,
  deleteAgence,
  retrieveAgences,
  selectAgences,
  updateAgency,
} from "../../../../slices/agenceSlice";
import { AppDispatch } from "../../../../store";
import agence from "../../../../types/agence/agence";
import "./Agence.scss";
import ModalNewAgence from "./modalNewAgence/ModalNewAgence";

const validationSchema = Yup.object().shape({
  abrAgc: Yup.string().required("Abbreviation is required"),
  agc: Yup.string().required("Agency is required"),
  telAgc: Yup.string().required("Tel is required"),
  addAgc: Yup.string().required("Address is required"),
  mdp: Yup.string().required("Password is required"),
});

const Agence: FC = (): ReactElement => {
  const [searchAgc, onChangeSearchAgc] = useChangeInput("");

  const listAgences = useSelector(selectAgences);
  const loadingRetrieve = useSelector(agenceLoadingRetrieve);
  const loadingDelete = useSelector(agenceLoadingDelete);
  const loadingUpdate = useSelector(agenceLoadingUpdate);

  const [showModalNewAgc, setShowModalNewAgc] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [modify, setModify] = useState<boolean>(false);
  const [btnModify, setBtnModify] = useState<boolean>(false);

  const [agcIndex, setAgcIndex] = useState<number | null>(null);
  const [abrAgcToDelete, setAbrAgcToDelete] = useState<string | null>(null);

  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);

  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<agence>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retrieveAgences(searchAgc));
  }, [dispatch]);

  const createdAgc = () => {
    setShowModalNewAgc(false);
    dispatch(retrieveAgences(searchAgc));
  };

  const deleteAgc = (abrAgc: string, index: number): void => {
    setShowModalConfirmDelete(true);
    setAbrAgcToDelete(abrAgc);
    setAgcIndex(index);
  };

  const onDeleteModalAccept = (): void => {
    setShowModalConfirmDelete(false);
    dispatch(deleteAgence(abrAgcToDelete!));
  };

  const modifyAgc = (agence: agence, index: number): void => {
    setAgcIndex(index);
    setModify(true);
    setValue(`abrAgc`, agence.abrAgc, { shouldValidate: true });
    setValue(`agc`, agence.agc, { shouldValidate: true });
    setValue(`telAgc`, agence.telAgc, { shouldValidate: true });
    setValue(`addAgc`, agence.addAgc, { shouldValidate: true });
    setValue(`mdp`, agence.mdp, { shouldValidate: true });
  };

  const cancelUpdate = (): void => {
    setModify(false);
    setBtnModify(false);
    clearErrors();
  };

  const onUpdateSubmit = async (data: agence) => {
    const { meta } = await dispatch(updateAgency(data));
    if (meta.requestStatus === "fulfilled") cancelUpdate();
  };

  return (
    <div className="bg px-2">
      <h4 className="pt-2">
        <IconHi2.HiHome className="me-2" />
        {AGENCY}
      </h4>

      <RouteProgress />

      <div className="content-agence">
        <div className="d-flex mb-2">
          <div className="add-button">
            <button
              className="btn btn-success btn-sm d-flex align-items-middle fs-18 h-100 py-0"
              onClick={() => setShowModalNewAgc(true)}
            >
              <IconFi.FiPlus className="w-100 h-100" />
            </button>
          </div>

          <div className="input-group ms-auto">
            <input
              type="text"
              className="form-control"
              placeholder={AGENCY}
              value={searchAgc}
              onChange={onChangeSearchAgc}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") dispatch(retrieveAgences(searchAgc));
              }}
            />
            <button
              className="input-group-text btn btn-primary"
              type="button"
              onClick={() => dispatch(retrieveAgences(searchAgc))}
            >
              <IconBs.BsSearch className="fs-18" />
            </button>
          </div>
        </div>

        {loadingRetrieve ? (
          <TableSkel col={5} row={5} />
        ) : listAgences.length ? (
          <>
            <form onSubmit={handleSubmit(onUpdateSubmit)}>
              <table className="table table-bordered table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Agency</th>
                    <th scope="col">Tel</th>
                    <th scope="col">Address</th>
                    <th scope="col">Password</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listAgences
                    .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
                    .map((agence: agence, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row" style={{ verticalAlign: "middle" }}>
                            {agence.abrAgc}
                          </th>
                          <td>
                            {modify && index === agcIndex ? (
                              <InputModifyValidation
                                error={errors.agc}
                                setValue={setValue}
                                defaultValue={agence.agc}
                                modify={() => setBtnModify(true)}
                                name="agc"
                              />
                            ) : (
                              <span>{agence.agc}</span>
                            )}
                          </td>
                          <td>
                            {modify && index === agcIndex ? (
                              <InputModifyValidation
                                error={errors.telAgc}
                                setValue={setValue}
                                defaultValue={agence.telAgc}
                                modify={() => setBtnModify(true)}
                                name="telAgc"
                              />
                            ) : (
                              <span>{agence.telAgc}</span>
                            )}
                          </td>
                          <td>
                            {modify && index === agcIndex ? (
                              <InputModifyValidation
                                error={errors.addAgc}
                                setValue={setValue}
                                defaultValue={agence.addAgc}
                                modify={() => setBtnModify(true)}
                                name="addAgc"
                              />
                            ) : (
                              <span>{agence.addAgc}</span>
                            )}
                          </td>
                          <td>
                            {modify && index === agcIndex ? (
                              <InputModifyValidation
                                error={errors.mdp}
                                setValue={setValue}
                                defaultValue={agence.mdp}
                                modify={() => setBtnModify(true)}
                                name="mdp"
                              />
                            ) : (
                              <span>{agence.mdp}</span>
                            )}
                          </td>
                          <td className={`text-center ${modify ? "mi-w-8" : ""}`}>
                            {modify && index === agcIndex && (
                              <button
                                type="button"
                                className="btn btn-dark-b btn-sm box-sdw rounded-pill me-2"
                                onClick={cancelUpdate}
                              >
                                <IconBs.BsArrowCounterclockwise className="fs-16" />
                              </button>
                            )}

                            {btnModify && index === agcIndex ? (
                              <button
                                type="submit"
                                className="btn btn-success btn-sm box-sdw rounded-pill me-2"
                              >
                                {loadingUpdate && agcIndex === index && (
                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                )}
                                <IconFa.FaSave />
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm box-sdw rounded-pill me-2"
                                onClick={() => modifyAgc(agence, index)}
                              >
                                <IconFa.FaEdit />
                              </button>
                            )}

                            <button
                              type="button"
                              className="btn btn-info btn-sm box-sdw rounded-pill me-2"
                              // onClick={() => deleteAgc(agence.abrAgc, index)}
                            >
                              {loadingDelete && agcIndex === index && (
                                <span className="spinner-border spinner-border-sm me-1"></span>
                              )}
                              <IconTi.TiInfoLarge className="fs-16" />
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm box-sdw rounded-pill"
                              onClick={() => deleteAgc(agence.abrAgc, index)}
                            >
                              {loadingDelete && agcIndex === index && (
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
            </form>

            <div className="page">
              <PaginationControl
                last
                page={page}
                // between={2}
                total={listAgences.length}
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
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </>
        ) : (
          <p className="no-result fw-bold text-center pt-1">No results</p>
        )}
      </div>

      <ModalNewAgence
        show={showModalNewAgc}
        onHide={() => setShowModalNewAgc(false)}
        onSubmit={createdAgc}
      ></ModalNewAgence>

      <ModalConfirm
        show={showModalConfirmDelete}
        onHide={() => {
          setShowModalConfirmDelete(false);
        }}
        onAccept={onDeleteModalAccept}
      >
        Do you really want to delete this agency ?
      </ModalConfirm>
    </div>
  );
};

export default Agence;
