import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import {
  createArticle,
  deleteArticle,
  getArticles,
} from "../../../../../store/actions/articlesAction";
import { articlesSelector } from "../../../../../store/selectors/articlesSelector";
import useChange from "../../hookCreated/useChange";
import useRoute from "../../hookCreated/useRoute";
import useSelect from "../../hookCreated/useSelect";
import useTable, { TablePage } from "../../hookCreated/useTable";
import UpdateArticle from "./UpdateArticle";

const ArticlesService = require("../../../../../services/articles.service");

const SelectModel = (props) => {
  return (
    <Select
      className="basic-single modal-select my-1 mb-3"
      classNamePrefix="select"
      isClearable
      isSearchable
      name="color"
      getOptionLabel={props.getOption}
      getOptionValue={props.getOption}
      onChange={props.onChange}
      options={props.options}
    />
  );
};

const Articles = () => {
  const [route] = useRoute(useLocation());

  const [newArt, setNewArt] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const [catArtFilter, setCatArtFilter] = useState("");
  const [searchDesArt, onChangeSearchDesArt] = useChange("");

  const [image, setImage] = useState({
    data: "",
    name: "",
  });
  const [refArt, onChangeRefArt, resetRefArt] = useChange("");
  const [desArt, onChangeDesArt, resetDesArt] = useChange("");
  const [puHT, onChangePuHT, resetPuHT] = useChange("");
  const [d_g, onChangeD_G, resetD_G] = useChange("");
  const [mD, onChangeMD, resetMD] = useChange("");
  const [mG, onChangeMG, resetMG] = useChange("");
  const [catArt, handleCatArt] = useSelect();
  const [condArt, handleCondArt] = useSelect();
  const [utvArt, handleUtvArt] = useSelect();

  const [catArtData, setCatArtData] = useState([]);
  const [condArtData, setCondArtData] = useState([]);
  const [uvtArtData, setUtvArtData] = useState([]);

  const dispatch = useDispatch();
  const articles = useSelector(articlesSelector);

  const [page, setPage] = useState(1);
  const { slice, range } = useTable(articles, page, 7);
  const [progressPercent, setProgressPercent] = useState(0);

  const [artUpdate, setArtUpdate] = useState(null);

  useEffect(() => {
    dispatch(getArticles(searchDesArt, catArtFilter));
    getCatArt();
    getCondArt();
    getUtvArt();
  }, []);

  const getCatArt = async () => {
    try {
      const res = await ArticlesService.getCatArt("");
      setCatArtData(res.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const getCondArt = async () => {
    try {
      const res = await ArticlesService.getCondArt("");
      setCondArtData(res.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const getUtvArt = async () => {
    try {
      const res = await ArticlesService.getUtvArt("");
      setUtvArtData(res.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleCatArtFilter = async (option) => {
    let searchCatArt = option === null ? "" : option.catArt;
    setCatArtFilter(searchCatArt);
    dispatch(getArticles(searchDesArt, searchCatArt));
  };

  const upload = ({ target: { files } }) => {
    setImage({
      data: files[0],
      name: files[0].name,
    });
  };

  const close = () => {
    setNewArt(false);
    setProgressPercent(0);
    resetD_G();
    resetDesArt();
    resetMD();
    resetMG();
    resetPuHT();
    resetRefArt();
  };

  const newArticle = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("categoryImage", image.data);
    data.append("imgArt", image.name);
    data.append("refArt", refArt);
    data.append("desArt", desArt);
    data.append("puHT", puHT);
    data.append("d_g", d_g);
    data.append("mD", mD);
    data.append("mG", mG);
    data.append("FKcatArt", catArt);
    data.append("FKcondArt", condArt);
    data.append("FKutvArt", utvArt);
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgressPercent(percent);
      },
    };
    try {
      dispatch(createArticle(data, options));
      setTimeout(() => {
        close();
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setProgressPercent(0);
      }, 1500);
    }
  };

  return (
    <div className="h-100 container-fluid px-2">
      <div className="admin-menu-title bg-light">
        <h4>Articles</h4>
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

      <div className="sub-right bg-light py-3 px-3">
        <div className="d-flex mb-3">
          <button
            className="btn btn-outline-success details-button me-3"
            onClick={() => setNewArt(true)}
          >
            <Icon.Plus className="details-icon" />
          </button>
          <div className="filter">
            <Icon.Boxes className="p-1 ps-0 w-100 h-100" />
            <p className="title-filter text-center">Catégorie</p>
          </div>
          <Select
            className="basic-single select ms-2"
            classNamePrefix="select"
            getOptionLabel={(option) => option.catArt}
            getOptionValue={(option) => option.catArt}
            isClearable
            isSearchable
            name="color"
            onChange={handleCatArtFilter}
            options={catArtData}
          />
          <div className="d-flex ms-3 me-auto">
            <input
              type="text"
              className="input-search"
              placeholder="Désignation"
              value={searchDesArt}
              onChange={onChangeSearchDesArt}
            />
            <button
              className="btn-search"
              type="button"
              onClick={() => dispatch(getArticles(searchDesArt, catArtFilter))}
            >
              <Icon.Search className="w-100 h-100" />
            </button>
          </div>

          <TablePage
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
            fastButton={true}
          />
        </div>

        {articles.length !== 0 ? (
          <table className="table table-sm table-hover table-responsive">
            <thead>
              <tr>
                <td className="text-center">Article</td>
                <td>Référence</td>
                <td>Désignation</td>
                <td>Catégorie</td>
                <td className="text-end">PU HT [Ar]</td>
                <td className="text-end">D/G</td>
                <td className="text-end">M.D [%]</td>
                <td className="text-end pe-4">M.G [%]</td>
                <td>Conditionnement</td>
                <td>Unité de vente</td>
                <td>Date de création</td>
                <td className="text-center">Action</td>
              </tr>
            </thead>
            <tbody>
              {slice.map((item, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">
                    <img
                      src={`http://localhost:8080/${item.urlArt}`}
                      alt={`${item.imgArt}`}
                      className="img-table"
                    />
                  </td>
                  <td className="align-middle">{item.refArt}</td>
                  <td className="align-middle">{item.desArt}</td>
                  <td className="align-middle">{item.FKcatArt}</td>
                  <td className="text-end align-middle">{item.puHT}</td>
                  <td className="text-end align-middle">{item.d_g}</td>
                  <td className="text-end align-middle">{item.mD}</td>
                  <td className="text-end pe-4 align-middle">{item.mG}</td>
                  <td className="align-middle">{item.FKcondArt}</td>
                  <td className="align-middle">{item.FKutvArt}</td>
                  <td className="align-middle">
                    {new Date(item.dateArt).toLocaleDateString()}
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-danger btn-sm circle-button me-2"
                      onClick={() => dispatch(deleteArticle(item.refArt))}
                    >
                      <Icon.Trash className="h-100 w-100" />
                    </button>
                    <button
                      className="btn btn-dark btn-sm circle-button"
                      onClick={() => {
                        setArtUpdate({ ...artUpdate, ...item });
                        setUpdateStatus(true);
                      }}
                    >
                      <Icon.Pen className="h-100 w-100" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="border bg-light px-3 pt-2 d-flex justify-content-center fw-bold">
            <p>No Results</p>
          </div>
        )}

        <Modal
          show={newArt}
          centered
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body>
            <div className="container">
              <h5 className="text-center">
                <Icon.Box className="sub-right-title-icon" />
                Nouveau Article
              </h5>
              <hr />
              <form action="submit" onSubmit={newArticle}>
                <div className="row">
                  <div className="col-sm-6">
                    <label>Photo</label>
                    <div className="input-group">
                      <input
                        required
                        type="file"
                        className="form-control my-1 mb-3"
                        id="inputGroupFile02"
                        onChange={upload}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="refArt">Référence</label>
                    <div className="input-icon-group my-1 mb-3">
                      <span className="input-icon">
                        <Icon.Search className="w-75 h-75" />
                      </span>
                      <input
                        required
                        type="text"
                        className="input-with-icon"
                        id="refArt"
                        name="refArt"
                        value={refArt}
                        onChange={onChangeRefArt}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="desArt">Désignation</label>
                    <input
                      required
                      type="text"
                      className="form-control my-1 mb-3"
                      id="desArt"
                      name="desArt"
                      value={desArt}
                      onChange={onChangeDesArt}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label>Catégorie</label>
                    <SelectModel
                      onChange={handleCatArt}
                      options={catArtData}
                      getOption={(option) => option.catArt}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="d_g">Limite Détails/Gros</label>
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
                    <label htmlFor="puHT">PU HT [Ar]</label>
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
                    <label htmlFor="mD">Marge Détails</label>
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
                    <label>Conditionnement</label>
                    <SelectModel
                      onChange={handleCondArt}
                      options={condArtData}
                      getOption={(option) => option.condArt}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="mG">Marge Gros</label>
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
                    <label>Unité de vente</label>
                    <SelectModel
                      onChange={handleUtvArt}
                      options={uvtArtData}
                      getOption={(option) => option.utvArt}
                    />
                  </div>
                </div>

                <div
                  className="progress w-50 mx-auto"
                  style={{ height: "1px" }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progressPercent}%` }}
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-success me-2">
                    Créer
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning ms-2"
                    onClick={close}
                  >
                    Fermer
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {artUpdate && (
          <UpdateArticle
            updateStatus={updateStatus}
            onHide={() => {
              setUpdateStatus(false);
              setArtUpdate(null);
            }}
            item={artUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Articles;
