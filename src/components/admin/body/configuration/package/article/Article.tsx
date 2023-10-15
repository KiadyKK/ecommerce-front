import { FC, ReactElement, useEffect, useState } from "react";
import * as IconBs from "react-icons/bs";
import * as IconMd from "react-icons/md";
import * as IconTb from "react-icons/tb";
import * as IconFi from "react-icons/fi";
import * as IconFa from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import RouteProgress from "../../../../../../shared/components/routeProgress/RouteProgress";
import {
  categoryLoadingRetrieve,
  retrieveCategory,
  selectCategories,
} from "../../../../../../slices/categorySlice";
import {
  conditionnementLoadingRetrieve,
  retrieveConditionnement,
  selectConditionnements,
} from "../../../../../../slices/conditionnementSlice";
import {
  retrieveUniteVente,
  selectUniteVentes,
  uniteVenteLoadingRetrieve,
} from "../../../../../../slices/uniteVenteSlice";
import {
  retrieveArticle,
  selectArticles,
  articleLoadingRetrieve,
  articleLoadingDelete,
  articleLoadingUpdate,
} from "../../../../../../slices/articleSlice";
import { AppDispatch } from "../../../../../../store";
import "./Article.scss";
import TableSkel from "../../../../../../shared/skeletor/TableSkel";
import article1 from "../../../../../../types/article/article1";
import { PaginationControl } from "react-bootstrap-pagination-control";
import ModalNewArticle from "./modalNewArticle/ModalNewArticle";
import { convert } from "../../../../../../shared/utils/dateUtil";

const API_URL = process.env.REACT_APP_API_URL;

const Article: FC = (): ReactElement => {
  const [catArtFilter, setCatArtFilter] = useState<string>("");
  const loadingRetrieveCat = useSelector(categoryLoadingRetrieve);
  const listCategories = useSelector(selectCategories);

  const [condArtFilter, setCondArtFilter] = useState<string>("");
  const loadingRetrieveCond = useSelector(conditionnementLoadingRetrieve);
  const listCond = useSelector(selectConditionnements);

  const [utvArtFilter, setUtvArtFilter] = useState<string>("");
  const loadingRetrieveUtv = useSelector(uniteVenteLoadingRetrieve);
  const listUtv = useSelector(selectUniteVentes);

  const [articleFilter, setArticleFilter] = useState<string>("");
  const loadingRetrieveArt = useSelector(articleLoadingRetrieve);
  const listArt = useSelector(selectArticles);
  const loadingDeleteArt = useSelector(articleLoadingDelete);
  const loadingUpdateArt = useSelector(articleLoadingUpdate);

  const [showNewArt, setShowNewArt] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retrieveCategory(""));
    dispatch(retrieveConditionnement(""));
    dispatch(retrieveUniteVente(""));
    getArt();
  }, [dispatch]);

  const onChangeSearchCat = (option: any) => {
    let catArtFilter: string = option === null ? "" : option.catArt;
    setCatArtFilter(catArtFilter);
    dispatch(
      retrieveArticle({
        catArtFilter,
        condArtFilter,
        utvArtFilter,
        articleFilter,
      })
    );
  };

  const onChangeSearchCond = (option: any) => {
    let condArtFilter: string = option === null ? "" : option.condArt;
    setCondArtFilter(condArtFilter);
    dispatch(
      retrieveArticle({
        catArtFilter,
        condArtFilter,
        utvArtFilter,
        articleFilter,
      })
    );
  };

  const onChangeSearchUtv = (option: any) => {
    let utvArtFilter: string = option === null ? "" : option.utvArt;
    setUtvArtFilter(utvArtFilter);
    dispatch(
      retrieveArticle({
        catArtFilter,
        condArtFilter,
        utvArtFilter,
        articleFilter,
      })
    );
  };

  const onChangeSearchArticle = (e: any) => {
    setArticleFilter(e.target.value);
  };

  const createdArt = () => {
    setShowNewArt(false);
    getArt();
  };

  const getArt = () => {
    dispatch(
      retrieveArticle({
        catArtFilter,
        condArtFilter,
        utvArtFilter,
        articleFilter,
      })
    );
  };

  return (
    <div className="bg px-2">
      <h4 className="pt-2">
        <IconTb.TbReportMoney className="me-2" />
        Article
      </h4>

      <RouteProgress />

      <div className="content-article">
        <div className="d-flex">
          <div className="add-button">
            <label className="mb-1"></label>
            <button
              className="btn btn-success btn-sm d-flex align-items-middle fs-18 h-100 py-0"
              onClick={() => setShowNewArt(true)}
            >
              <IconFi.FiPlus className="w-100 h-100" />
            </button>
          </div>

          <div className="ms-auto me-2">
            <label className="mb-1">
              <IconMd.MdCategory className="me-1" />
              Category
            </label>
            {loadingRetrieveCat ? (
              <Skeleton className="select-skel" />
            ) : (
              <Select
                className="basic-single auto-complete"
                classNamePrefix="select"
                isClearable
                isSearchable
                getOptionLabel={(option) => option.catArt}
                getOptionValue={(option) => option.catArt}
                onChange={onChangeSearchCat}
                name="Category"
                options={listCategories}
              />
            )}
          </div>

          <div className="me-2">
            <label className="mb-1">
              <IconBs.BsFillBoxSeamFill className="me-2" />
              Conditioning
            </label>
            {loadingRetrieveCond ? (
              <Skeleton className="select-skel" />
            ) : (
              <Select
                className="basic-single auto-complete"
                classNamePrefix="select"
                isClearable
                isSearchable
                getOptionLabel={(option) => option.condArt}
                getOptionValue={(option) => option.condArt}
                onChange={onChangeSearchCond}
                name="Conditioning"
                options={listCond}
              />
            )}
          </div>

          <div className="me-2">
            <label className="mb-1">
              <IconBs.BsFillCartPlusFill className="me-1" />
              Sales unit
            </label>
            {loadingRetrieveUtv ? (
              <Skeleton className="select-skel" />
            ) : (
              <Select
                className="basic-single auto-complete"
                classNamePrefix="select"
                isClearable
                isSearchable
                getOptionLabel={(option) => option.utvArt}
                getOptionValue={(option) => option.utvArt}
                onChange={onChangeSearchUtv}
                name="Sales unit"
                options={listUtv}
              />
            )}
          </div>

          <div>
            <label htmlFor="article" className="mb-1">
              <IconTb.TbReportMoney className="me-1" />
              Article
            </label>
            <div className="input-group input-group-sm h-100">
              <input
                type="text"
                id="article"
                className="form-control h-100"
                placeholder="Article"
                value={articleFilter}
                onChange={onChangeSearchArticle}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter")
                    dispatch(
                      retrieveArticle({
                        catArtFilter,
                        condArtFilter,
                        utvArtFilter,
                        articleFilter,
                      })
                    );
                }}
              />
              <button
                className="input-group-text btn btn-primary h-100"
                type="button"
                onClick={() =>
                  dispatch(
                    retrieveArticle({
                      catArtFilter,
                      condArtFilter,
                      utvArtFilter,
                      articleFilter,
                    })
                  )
                }
              >
                <IconBs.BsSearch className="w-100 h-100" />
              </button>
            </div>
          </div>
        </div>

        {loadingRetrieveArt ? (
          <TableSkel col={12} row={5} />
        ) : listArt.length ? (
          <>
            <table className="table table-bordered table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">Pic</th>
                  <th scope="col">Reference</th>
                  <th scope="col">Designation</th>
                  <th scope="col">PU [Ar]</th>
                  <th scope="col">D/G</th>
                  <th scope="col">MD [%]</th>
                  <th scope="col">MG [%]</th>
                  <th scope="col">Creation date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Conditioning</th>
                  <th scope="col">Sales unit</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listArt
                  .slice(
                    (page - 1) * pageSize,
                    (page - 1) * pageSize + pageSize
                  )
                  .map((article1: article1, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="img-article">
                          <img
                            src={`${API_URL}/article/download/${article1.refArt}_${article1.imgArt}`}
                            alt="image"
                          />
                        </td>
                        <th scope="row" style={{ verticalAlign: "middle" }}>
                          {article1.refArt}
                        </th>
                        <td>{article1.desArt}</td>
                        <td>{article1.puHT}</td>
                        <td>{article1.dg}</td>
                        <td>{article1.md}</td>
                        <td>{article1.mg}</td>
                        <td>{convert(article1.dateArt)}</td>
                        <td>{article1.categorie.catArt}</td>
                        <td>{article1.conditionnement.condArt}</td>
                        <td>{article1.uniteVente.utvArt}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-dark-b btn-sm box-sdw rounded-pill me-2"
                            // onClick={() => {
                            //   setShowUpdateCat(true);
                            //   setCategoryToUpdate(category);
                            // }}
                          >
                            <IconFa.FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm box-sdw rounded-pill"
                            // onClick={() => deleteCat(category.id, index)}
                          >
                            {/* {loadingDelete && catIndex === index && (
                              <span className="spinner-border spinner-border-sm me-1"></span>
                            )} */}
                            <IconBs.BsFillTrash3Fill />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="page">
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
        ) : (
          <p className="no-result fw-bold text-center pt-1">No results</p>
        )}
      </div>

      <ModalNewArticle
        show={showNewArt}
        onHide={() => setShowNewArt(false)}
        onSubmit={createdArt}
      ></ModalNewArticle>
    </div>
  );
};

export default Article;
