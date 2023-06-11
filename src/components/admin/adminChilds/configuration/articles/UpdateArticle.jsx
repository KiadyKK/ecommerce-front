import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle } from "../../../../../store/actions/articlesAction";
import useChange from "../../hookCreated/useChange";

const UpdateArticle = ({ updateStatus, onHide, item }) => {
  const dispatch = useDispatch();

  const [puHT, onChangePuHT, resetPuHT] = useChange(item.puHT);
  const [d_g, onChangeD_G, resetD_G] = useChange(item.d_g);
  const [mD, onChangeMD, resetMD] = useChange(item.mD);
  const [mG, onChangeMG, resetMG] = useChange(item.mG);

  useEffect(() => {
    console.log(item)
  }, []);

  const updateArt = () => {
    const data = {
      ...item,
      puHT: puHT,
      d_g: d_g,
      mD: mD,
      mG: mG,
    };
    dispatch(updateArticle(item.refArt, data));
    onHide();
  };

  return (
    <Modal
      show={updateStatus}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body>
        <div className="container">
          <h5 className="text-center">
            <Icon.Pen className="sub-right-title-icon" />
            Modification Article
          </h5>
          <hr />
          <div>
            <div className="row">
              <div className="col-sm-6">
                <img
                  src={`http://localhost:8080/${item.urlArt}`}
                  alt={`${item.imgArt}`}
                  className="img-table"
                />
              </div>

              <div className="col-sm-6">
                <label>Référence :</label>
                <p>{item.refArt}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label>Désignation :</label>
                <p>{item.desArt}</p>
              </div>
              <div className="col-sm-6">
                <label>Catégorie :</label>
                <p>{item.FKcatArt}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="d_g">Limite Détails/Gros :</label>
                <input
                  required
                  type="text"
                  className="form-control my-1 mb-3"
                  id="d_g"
                  name="d_g"
                  value={d_g}
                  onChange={onChangeD_G}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="puHT">PU HT [Ar] :</label>
                <input
                  required
                  type="text"
                  className="form-control my-1 mb-3"
                  id="puHT"
                  name="puHT"
                  value={puHT}
                  onChange={onChangePuHT}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="mD">Marge Détails :</label>
                <input
                  required
                  type="text"
                  className="form-control my-1 mb-3"
                  id="mD"
                  name="mD"
                  value={mD}
                  onChange={onChangeMD}
                />
              </div>
              <div className="col-sm-6">
                <label>Conditionnement :</label>
                <p>{item.FKcondArt}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="mG">Marge Gros :</label>
                <input
                  required
                  type="text"
                  className="form-control my-1 mb-3"
                  id="mG"
                  name="mG"
                  value={mG}
                  onChange={onChangeMG}
                />
              </div>
              <div className="col-sm-6">
                <label>Unité de vente :</label>
                <p>{item.FKutvArt}</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-success me-2"
                onClick={() => console.log(item.d_g)}
              >
                Créer
              </button>
              <button className="btn btn-warning ms-2" onClick={onHide}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateArticle;
