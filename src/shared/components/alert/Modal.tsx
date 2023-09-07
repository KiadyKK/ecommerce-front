import { FC, PropsWithChildren, ReactElement } from "react";
import "./Modal.scss";
import Modal from "react-bootstrap/Modal";
import * as IconBs from "react-icons/bs";
import * as IconSl from "react-icons/sl";

type props = PropsWithChildren<{
  show: boolean;
  onHide: () => void;
  onAccept: () => void
}>;

const CustomModal: FC<props> = (props): ReactElement => {
  return (
    <Modal
      className="custom-modal"
      show={props.show}
      onHide={props.onHide}
      centered
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton />
      <Modal.Body className="text-white text-center">
        <div className="fs-14">{props.children}</div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light-dark btn-sm" onClick={props.onHide}>
          <IconSl.SlClose />
          &nbsp;No
        </button>
        <button className="btn btn-primary btn-sm" onClick={props.onAccept}>
          <IconBs.BsCheckCircle />
          &nbsp;Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
