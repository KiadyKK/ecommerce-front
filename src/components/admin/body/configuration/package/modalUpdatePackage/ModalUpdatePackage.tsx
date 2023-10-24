import { FC, PropsWithChildren, ReactElement, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as IconFa from "react-icons/fa";
import * as IconSl from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORY,
  CONDITIONNEMENT,
  UNITEVENTE,
} from "../../../../../../shared/constant/constant";
import "./ModalUpdatePackage.scss";

import {
  categoryError,
  categoryLoadingUpdate,
  resetError as resetErrorCategory,
  updateCategory,
} from "../../../../../../slices/categorySlice";
import {
  conditionnementError,
  conditionnementLoadingUpdate,
  resetError as resetErrorConditionnement,
  updateConditionnement,
} from "../../../../../../slices/conditionnementSlice";
import {
  resetError as resetErrorUniteVente,
  uniteVenteError,
  uniteVenteLoadingUpdate,
  updateUniteVente,
} from "../../../../../../slices/uniteVenteSlice";
import { AppDispatch } from "../../../../../../store";
import category from "../../../../../../types/categorie/categorie";
import conditionnement from "../../../../../../types/conditionnement/conditionnement";
import uniteVente from "../../../../../../types/uniteVente/uniteVente";

type data = category | conditionnement | uniteVente;

type props = PropsWithChildren<{
  data: data;
  show: boolean;
  package: string;
  onHide: () => void;
}>;

const getPackageName: any = (toBeDetermined: data): string => {
  if ("catArt" in toBeDetermined) return toBeDetermined.catArt;
  else if ("condArt" in toBeDetermined) return toBeDetermined.condArt;
  else if ("utvArt" in toBeDetermined) return toBeDetermined.utvArt;
  else return "";
};

const ModalUpdatePackage: FC<props> = (props): ReactElement => {
  const [name, setName] = useState<string>(getPackageName(props.data));

  const catArtUpdateLoading: boolean = useSelector(categoryLoadingUpdate);
  const errorCategory: string = useSelector(categoryError);

  const condArtUpdateLoading: boolean = useSelector(
    conditionnementLoadingUpdate
  );
  const errorCond: string = useSelector(conditionnementError);

  const utvArtUpdateLoading: boolean = useSelector(uniteVenteLoadingUpdate);
  const errorUtv: string = useSelector(uniteVenteError);

  const dispatch = useDispatch<AppDispatch>();

  const update = async () => {
    let res: any;
    switch (props.package) {
      case CATEGORY:
        const category: category = { id: props.data.id, catArt: name };
        res = await dispatch(updateCategory(category));
        break;

      case CONDITIONNEMENT:
        const conditionnement: conditionnement = {
          id: props.data.id,
          condArt: name,
        };
        res = await dispatch(updateConditionnement(conditionnement));
        break;

      case UNITEVENTE:
        const uniteVente: uniteVente = {
          id: props.data.id,
          utvArt: name,
        };
        res = await dispatch(updateUniteVente(uniteVente));
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
    <Modal
      className="modal-update"
      show={props.show}
      onHide={props.onHide}
      centered
      keyboard={false}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>Update {props.package}</Modal.Header>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") update();
              else resetError();
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
        <button className="btn btn-primary btn-sm" onClick={update}>
          <IconFa.FaEdit className="fs-18 me-1" />
          Update
          {(catArtUpdateLoading ||
            condArtUpdateLoading ||
            utvArtUpdateLoading) && (
            <span className="spinner-border spinner-border-sm ms-1"></span>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdatePackage;
