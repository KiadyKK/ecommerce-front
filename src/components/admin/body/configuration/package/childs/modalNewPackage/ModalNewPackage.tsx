import { FC, PropsWithChildren, ReactElement, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as IconBs from "react-icons/bs";
import * as IconSl from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryError,
  categoryLoadingCreate,
  createCategory,
  resetError as resetErrorCategory,
} from "../../../../../../../slices/categorySlice";
import {
  conditionnementError,
  conditionnementLoadingCreate,
  createConditionnement,
  resetError as resetErrorConditionnement,
} from "../../../../../../../slices/conditionnementSlice";
import {
  uniteVenteError,
  uniteVenteLoadingCreate,
  createUniteVente,
  resetError as resetErrorUniteVente,
} from "../../../../../../../slices/uniteVenteSlice";
import { AppDispatch } from "../../../../../../../store";
import "./ModalNewPackage.scss";
import Toast from "../../../../../../../shared/components/toast/Toast";

type props = PropsWithChildren<{
  show: boolean;
  package: string;
  onHide: () => void;
}>;

const ModalNewPackage: FC<props> = (props): ReactElement => {
  const [name, setName] = useState<string>("");

  const catArtCreateLoading: boolean = useSelector(categoryLoadingCreate);
  const errorCategory: string = useSelector(categoryError);

  const condArtCreateLoading: boolean = useSelector(
    conditionnementLoadingCreate
  );
  const errorCond: string = useSelector(conditionnementError);

  const utvArtCreateLoading: boolean = useSelector(uniteVenteLoadingCreate);
  const errorUtv: string = useSelector(uniteVenteError);

  const dispatch = useDispatch<AppDispatch>();

  const create = async () => {
    let res: any;
    switch (props.package) {
      case "Category":
        res = await dispatch(createCategory(name));
        break;

      case "Conditionnement":
        res = await dispatch(createConditionnement(name));
        break;

      case "Sales unit":
        res = await dispatch(createUniteVente(name));
        break;
    }
    if (res!.meta.requestStatus === "fulfilled") props.onHide();
  };

  const cancel = () => {
    resetError();
    props.onHide();
  };

  const resetError = (): void => {
    if (errorCategory !== "") dispatch(resetErrorCategory());
    if (errorCond !== "") dispatch(resetErrorConditionnement());
    if (errorUtv !== "") dispatch(resetErrorUniteVente());
  };

  return (
    <>
      <Modal
        className="modal-new-package"
        show={props.show}
        onHide={props.onHide}
        centered
        keyboard={false}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>New {props.package}</Modal.Header>
        <Modal.Body className="text-white text-center">
          <div className="input-group input-group-sm">
            <span className="input-group-text" id="basic-addon1">
              {props.children}
            </span>
            <input
              type="text"
              className={`${
                errorCategory !== "" || errorCond !== "" || errorUtv !== ""
                  ? "is-invalid"
                  : ""
              } form-control`}
              placeholder={props.package}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") create();
                else resetError();
              }}
            />
          </div>
          {(errorCategory !== "" || errorCond !== "" || errorUtv !== "") && (
            <p className="fs-14 text-danger mb-0">
              {errorCategory || errorCond || errorUtv}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-dark btn-sm d-flex align-items-center"
            onClick={cancel}
          >
            <IconSl.SlClose className="fs-18 me-1" />
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={create}>
            <IconBs.BsCheckCircle className="fs-18 me-1" />
            Save
            {(catArtCreateLoading ||
              condArtCreateLoading ||
              utvArtCreateLoading) && (
              <span className="spinner-border spinner-border-sm ms-1"></span>
            )}
          </button>
        </Modal.Footer>
      </Modal>

      <Toast />
    </>
  );
};

export default ModalNewPackage;
