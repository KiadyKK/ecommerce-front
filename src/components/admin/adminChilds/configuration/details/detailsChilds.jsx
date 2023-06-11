import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import useTable, { TablePage } from "../../hookCreated/useTable";
import Modal from "react-bootstrap/Modal";
import useChange from "../../hookCreated/useChange";

const DetailsChilds = (props) => {
  const [newStatus, setNewStatus] = useState(false);
  const [newItem, onChangenewItem, resetNewItem] = useChange();
  const [search, onChangeSearch, resetSearch] = useChange();
  const [page, setPage] = useState(1);
  const [item, setItem] = useState([]);
  const { slice, range } = useTable(item, page, 10);

  useEffect(() => {
    getItem("");
  }, []);

  const getItem = async (searchItem) => {
    try {
      const res = await props.getItem(searchItem);
      setItem(res.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const createItem = async (e) => {
    try {
      e.preventDefault();
      await props.createItem(newItem);
      setNewStatus(false);
      getItem("");
      resetNewItem();
      resetSearch();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const deleteItem = async (item) => {
    try {
      if (window.confirm(`Voulez-vous supprimer : ${props.name} "${item}"`)) {
      await props.deleteItem(item);
      getItem(search);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h5 className="m-0 mt-3">
        {props.icon}
        {props.name}
      </h5>
      <hr className="mb-4" />
      <div className="d-flex mb-3">
        <button
          className="btn btn-outline-success details-button"
          onClick={() => setNewStatus(true)}
        >
          <Icon.Plus className="details-icon" />
        </button>
        <div className="d-flex ms-2 me-auto">
          <input
            type="text"
            className="input-search"
            placeholder={props.name}
            value={search}
            onChange={onChangeSearch}
          />
          <button
            className="btn-search"
            type="button"
            onClick={() => getItem(search)}
          >
            <Icon.Search className="w-100 h-100" />
          </button>
        </div>
        <TablePage
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          fastButton={false}
        />
      </div>
      {item.length !== 0 ? (
        <table className="table table-sm table-hover table-responsive">
          <thead>
            <tr>
              <td>{props.name}</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {slice.map((item, index) => (
              <tr key={index}>
                <td className="pt-2">{Object.values(item)[0]}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm circle-button"
                    onClick={() => deleteItem(Object.values(item)[0])}
                  >
                    <Icon.Trash className="h-100 w-100" />
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
        show={newStatus}
        centered
        backdrop="static"
        keyboard={false}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div className="container">
            <h5 className="text-center">
              {props.icon}
              {props.name}
            </h5>
            <hr />
            <form action="submit" onSubmit={createItem}>
              <div>
                <label htmlFor="newItem">{props.name}</label>
                <input
                  type="text"
                  className="form-control my-2"
                  id="newItem"
                  name="newItem"
                  value={newItem}
                  onChange={onChangenewItem}
                />
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-success me-2">
                  Créer
                </button>
                <button
                  type="button"
                  className="btn btn-warning ms-2"
                  onClick={() => {
                    setNewStatus(false);
                    resetNewItem();
                  }}
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailsChilds;
