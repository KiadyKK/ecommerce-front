import { FC, PropsWithChildren, ReactElement, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as IconBs from "react-icons/bs";
import * as IconSl from "react-icons/sl";
import * as IconRi from "react-icons/ri";
import "./ModalNewPackage.scss";
import {
  categoryLoadingCreate,
  categoryError,
  createCategory,
  resetError as resetErrorCategory,
} from "../../../../../../../slices/categorySlice";
import { AppDispatch } from "../../../../../../../store";
import { useDispatch, useSelector } from "react-redux";

type props = PropsWithChildren<{
  show: boolean;
  package: string;
  onHide: () => void;
}>;

const ModalNewPackage: FC<props> = (props): ReactElement => {
  const [name, setName] = useState<string>("");

  const catArtCreateLoading: boolean = useSelector(categoryLoadingCreate);
  const errorCategory: string = useSelector(categoryError);

  const dispatch = useDispatch<AppDispatch>();
  const create = async () => {
    const res = await dispatch(createCategory(name));
    if (res.meta.requestStatus === "fulfilled") props.onHide();
  };

  const cancel = () => {
    if (errorCategory !== "") dispatch(resetErrorCategory());
    props.onHide();
  };

  return (
    <Modal
      className="custom-modal"
      show={props.show}
      onHide={props.onHide}
      centered
      keyboard={false}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>Save new {props.package}</Modal.Header>
      <Modal.Body className="text-white text-center">
        <div className="input-group input-group-sm">
          <span className="input-group-text" id="basic-addon1">
            {props.children}
          </span>
          <input
            type="text"
            className={`${
              errorCategory !== "" ? "is-invalid" : ""
            } form-control`}
            placeholder={props.package}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") create();
              else if (errorCategory !== "") dispatch(resetErrorCategory());
            }}
          />
        </div>
        {errorCategory !== "" && (
          <p className="fs-14 text-danger mb-0">{errorCategory}</p>
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
          {catArtCreateLoading && (
            <span className="spinner-border spinner-border-sm ms-1"></span>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNewPackage;
