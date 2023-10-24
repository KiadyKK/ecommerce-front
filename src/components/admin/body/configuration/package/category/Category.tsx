import { FC, ReactElement, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconFi from "react-icons/fi";
import * as IconMd from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "../../../../../../shared/components/modalConfirm/ModalConfirm";
import { CATEGORY } from "../../../../../../shared/constant/constant";
import TableSkel from "../../../../../../shared/skeletor/TableSkel";
import {
  categoryLoadingDelete,
  categoryLoadingRetrieve,
  deleteCategory,
  retrieveCategory,
  selectCategories,
} from "../../../../../../slices/categorySlice";
import { AppDispatch } from "../../../../../../store";
import category from "../../../../../../types/categorie/categorie";
import ModalNewPackage from "../modalNewPackage/ModalNewPackage";
import ModalUpdatePackage from "../modalUpdatePackage/ModalUpdatePackage";
import "./Category.scss";

const Category: FC = (): ReactElement => {
  const [searchCategory, setSearchCategory] = useState<string>("");

  const loadingRetrieve = useSelector(categoryLoadingRetrieve);
  const loadingDelete = useSelector(categoryLoadingDelete);
  const listCategories = useSelector(selectCategories);

  const [catIndex, setCatIndex] = useState<number | null>(null);
  const [idCatToDelete, setIdCatToDelete] = useState<number | null>(null);

  const [categoryToUpdate, setCategoryToUpdate] = useState<category | null>(
    null
  );

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [showNewCat, setShowNewCat] = useState<boolean>(false);
  const [showUpdateCat, setShowUpdateCat] = useState<boolean>(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retrieveCategory(searchCategory));
  }, [dispatch]);

  const onChangeSearchCategory = (e: any) => {
    setSearchCategory(e.target.value);
  };

  const deleteCat = (id: number, index: number): void => {
    setShowModalConfirmDelete(true);
    setIdCatToDelete(id);
    setCatIndex(index);
  };

  const onDeleteModalAccept = (): void => {
    setShowModalConfirmDelete(false);
    dispatch(deleteCategory(idCatToDelete!));
  };

  return (
    <div>
      <h5 className="sub-title">
        <IconMd.MdCategory className="me-2" />
        Category
      </h5>

      <div className="d-flex mb-2">
        <button
          className="btn btn-success btn-sm d-flex align-items-middle fs-18 py-0"
          onClick={() => setShowNewCat(true)}
        >
          <IconFi.FiPlus className="w-100 h-100" />
        </button>

        <div className="input-group input-group-sm ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={searchCategory}
            onChange={onChangeSearchCategory}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") dispatch(retrieveCategory(searchCategory));
            }}
          />
          <button
            className="input-group-text btn btn-primary"
            type="button"
            onClick={() => dispatch(retrieveCategory(searchCategory))}
          >
            <IconBs.BsSearch className="w-100 h-100" />
          </button>
        </div>
      </div>

      {!loadingRetrieve ? (
        !listCategories.length ? (
          <p className="result fw-bold text-center pt-1">No results</p>
        ) : (
          <>
            <table className="table table-bordered table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Category</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listCategories
                  .slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize
                  )
                  .map((category: category, index: number) => {
                    return (
                      <tr key={index}>
                        <th scope="row" style={{ verticalAlign: "middle" }}>
                          {category.id}
                        </th>
                        <td>{category.catArt}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-dark-b btn-sm box-sdw rounded-pill me-2"
                            onClick={() => {
                              setShowUpdateCat(true);
                              setCategoryToUpdate(category);
                            }}
                          >
                            <IconFa.FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm box-sdw rounded-pill"
                            onClick={() => deleteCat(category.id, index)}
                          >
                            {loadingDelete && catIndex === index && (
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
                total={listCategories.length}
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
        )
      ) : (
        <TableSkel col={3} row={5} />
      )}

      <ModalNewPackage
        show={showNewCat}
        package={CATEGORY}
        onHide={() => setShowNewCat(false)}
      >
        <IconMd.MdCategory />
      </ModalNewPackage>

      {categoryToUpdate && (
        <ModalUpdatePackage
          data={categoryToUpdate}
          show={showUpdateCat}
          package={CATEGORY}
          onHide={() => {
            setShowUpdateCat(false);
            setCategoryToUpdate(null);
          }}
        >
          <IconMd.MdCategory />
        </ModalUpdatePackage>
      )}

      <ModalConfirm
        show={showModalConfirmDelete}
        onHide={() => {
          setShowModalConfirmDelete(false);
        }}
        onAccept={onDeleteModalAccept}
      >
        Do you really want to delete this category ?
      </ModalConfirm>
    </div>
  );
};

export default Category;
