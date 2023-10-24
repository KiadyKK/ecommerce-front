import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactElement, useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useForm } from "react-hook-form";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconFi from "react-icons/fi";
import * as IconMd from "react-icons/md";
import * as IconTb from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";
import InputModifyValidation from "../../../../../shared/components/inputModifyValidation/InputModifyValidation";
import ModalConfirm from "../../../../../shared/components/modalConfirm/ModalConfirm";
import ReactSelectModifyValidation from "../../../../../shared/components/reactSelectModifyValidation/ReactSelectModifyValidation";
import RouteProgress from "../../../../../shared/components/routeProgress/RouteProgress";
import TableSkel from "../../../../../shared/skeletor/TableSkel";
import { convert } from "../../../../../shared/utils/dateUtil";
import { floatNumberWithSpaces } from "../../../../../shared/utils/functionUtil";
import {
  articleLoadingDelete,
  articleLoadingRetrieve,
  articleLoadingUpdate,
  deleteArticle,
  retrieveArticle,
  selectArticles,
  updateArticle,
} from "../../../../../slices/articleSlice";
import {
  categoryLoadingRetrieve,
  retrieveCategory,
  selectCategories,
} from "../../../../../slices/categorySlice";
import {
  conditionnementLoadingRetrieve,
  retrieveConditionnement,
  selectConditionnements,
} from "../../../../../slices/conditionnementSlice";
import {
  retrieveUniteVente,
  selectUniteVentes,
  uniteVenteLoadingRetrieve,
} from "../../../../../slices/uniteVenteSlice";
import { AppDispatch } from "../../../../../store";
import article1 from "../../../../../types/article/article1";
import articleUpdate from "../../../../../types/article/articleUpdate";
import "./Article.scss";
import ModalNewArticle from "./modalNewArticle/ModalNewArticle";
import useChangeInput from "../../../../../shared/customHook/useChange";

const API_URL = process.env.REACT_APP_API_URL;

const validationSchema = Yup.object().shape({
  refArt: Yup.string().required("Reference is required"),
  desArt: Yup.string().required("Designation is required"),
  dg: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required("Detail/Wholesale is required")
    .typeError("Detail/Wholesale must be a number"),
  puHT: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required("Unit price is required")
    .typeError("Unit price must be a number"),
  md: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required("Detail margin is required")
    .typeError("Detail margin must be a number"),
  mg: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required("Wholesale margin is required")
    .typeError("Wholesale margin must be a number"),
  conditionnement: Yup.object()
    .shape({
      id: Yup.number().required("required"),
      condArt: Yup.string().required("required"),
    })
    .required("Conditioning is required"),
  uniteVente: Yup.object()
    .shape({
      id: Yup.number().required("required"),
      utvArt: Yup.string().required("required"),
    })
    .required("Sales unit is required"),
});

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

  const [desArtFilter, onChangeDesArtFilter] = useChangeInput("");
  const loadingRetrieveArt = useSelector(articleLoadingRetrieve);
  const listArt = useSelector(selectArticles);
  const loadingDelete = useSelector(articleLoadingDelete);
  const loadingUpdate = useSelector(articleLoadingUpdate);

  const [showNewArt, setShowNewArt] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [modify, setModify] = useState<boolean>(false);
  const [btnModify, setBtnModify] = useState<boolean>(false);

  const [artIndex, setArtIndex] = useState<number | null>(null);
  const [refArtToDelete, setRefArtToDelete] = useState<string | null>(null);

  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<articleUpdate>({
    resolver: yupResolver(validationSchema),
  });

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
        desArtFilter,
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
        desArtFilter,
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
        desArtFilter,
      })
    );
  };

  const createdArt = () => {
    setShowNewArt(false);
    getArt();
  };

  const deleteArt = (id: string, index: number): void => {
    setShowModalConfirmDelete(true);
    setRefArtToDelete(id);
    setArtIndex(index);
  };

  const onDeleteModalAccept = (): void => {
    setShowModalConfirmDelete(false);
    dispatch(deleteArticle(refArtToDelete!));
  };

  const getArt = () => {
    dispatch(
      retrieveArticle({
        catArtFilter,
        condArtFilter,
        utvArtFilter,
        desArtFilter,
      })
    );
  };

  const modifyArt = (article: article1, index: number): void => {
    setArtIndex(index);
    setModify(true);
    setValue(`refArt`, article.refArt!, { shouldValidate: true });
    setValue(`desArt`, article.desArt, { shouldValidate: true });
    setValue(`puHT`, article.puHT, { shouldValidate: true });
    setValue(`dg`, article.dg, { shouldValidate: true });
    setValue(`md`, article.md, { shouldValidate: true });
    setValue(`mg`, article.mg, { shouldValidate: true });
    setValue(`conditionnement`, article.conditionnement, {
      shouldValidate: true,
    });
    setValue(`uniteVente`, article.uniteVente, {
      shouldValidate: true,
    });
  };

  const cancelUpdate = (): void => {
    setModify(false);
    setBtnModify(false);
    clearErrors();
  };

  const onSubmit = async (data: any) => {
    const { meta } = await dispatch(updateArticle(data));
    if (meta.requestStatus === "fulfilled") cancelUpdate();
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
                className="basic-single auto-complete-search"
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
                className="basic-single auto-complete-search"
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
                className="basic-single auto-complete-search"
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
            <div className="input-group">
              <input
                type="text"
                id="article"
                className="form-control"
                placeholder="Designation"
                value={desArtFilter}
                onChange={onChangeDesArtFilter}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter")
                    dispatch(
                      retrieveArticle({
                        catArtFilter,
                        condArtFilter,
                        utvArtFilter,
                        desArtFilter,
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
                      desArtFilter,
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <table className="table table-bordered table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Pic</th>
                    <th scope="col">Reference</th>
                    <th scope="col">Designation</th>
                    <th scope="col" className="text-end">
                      PU [Ar]
                    </th>
                    <th scope="col" className="text-end">
                      D/G
                    </th>
                    <th scope="col" className="text-end">
                      MD [%]
                    </th>
                    <th scope="col" className="text-end">
                      MG [%]
                    </th>
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
                    .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
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
                          <td>
                            {modify && index === artIndex ? (
                              <InputModifyValidation
                                error={errors.desArt}
                                setValue={setValue}
                                defaultValue={article1.desArt}
                                modify={() => setBtnModify(true)}
                                name="desArt"
                              />
                            ) : (
                              <span>{article1.desArt}</span>
                            )}
                          </td>
                          <td className="text-end">
                            {modify && index === artIndex ? (
                              <InputModifyValidation
                                error={errors.puHT}
                                setValue={setValue}
                                defaultValue={article1.puHT}
                                modify={() => setBtnModify(true)}
                                name="puHT"
                              />
                            ) : (
                              <span>{floatNumberWithSpaces(article1.puHT)}</span>
                            )}
                          </td>
                          <td className="text-end ma-w-3">
                            {modify && index === artIndex ? (
                              <InputModifyValidation
                                error={errors.dg}
                                setValue={setValue}
                                defaultValue={article1.dg}
                                modify={() => setBtnModify(true)}
                                name="dg"
                              />
                            ) : (
                              <span>{article1.dg}</span>
                            )}
                          </td>
                          <td className="text-end ma-w-3">
                            {modify && index === artIndex ? (
                              <InputModifyValidation
                                error={errors.md}
                                setValue={setValue}
                                defaultValue={article1.md}
                                modify={() => setBtnModify(true)}
                                name="md"
                              />
                            ) : (
                              <span>{article1.md}</span>
                            )}
                          </td>
                          <td className="text-end ma-w-3">
                            {modify && index === artIndex ? (
                              <InputModifyValidation
                                error={errors.mg}
                                setValue={setValue}
                                defaultValue={article1.mg}
                                modify={() => setBtnModify(true)}
                                name="mg"
                              />
                            ) : (
                              <span>{article1.mg}</span>
                            )}
                          </td>
                          <td>{convert(article1.dateArt)}</td>
                          <td>{article1.categorie.catArt}</td>
                          <td>
                            {modify && index === artIndex ? (
                              <ReactSelectModifyValidation
                                register={{ ...register("conditionnement") }}
                                placeholder="Conditioning"
                                options={listCond}
                                getOptionLabel={(option) => option.condArt}
                                setValue={setValue}
                                error={errors.conditionnement}
                                modify={() => setBtnModify(true)}
                                defaultInputValue={article1.conditionnement.condArt}
                              >
                                conditionnement
                              </ReactSelectModifyValidation>
                            ) : (
                              <span>{article1.conditionnement.condArt}</span>
                            )}
                          </td>
                          <td>
                            {modify && index === artIndex ? (
                              <ReactSelectModifyValidation
                                register={{ ...register("uniteVente") }}
                                placeholder="Sales unit"
                                options={listUtv}
                                getOptionLabel={(option) => option.utvArt}
                                setValue={setValue}
                                error={errors.uniteVente}
                                modify={() => setBtnModify(true)}
                                defaultInputValue={article1.uniteVente.utvArt}
                              >
                                uniteVente
                              </ReactSelectModifyValidation>
                            ) : (
                              <span>{article1.uniteVente.utvArt}</span>
                            )}
                          </td>
                          <td className={`text-center ${modify ? "mi-w-8" : ""}`}>
                            {modify && index === artIndex && (
                              <button
                                type="button"
                                className="btn btn-dark-b btn-sm box-sdw rounded-pill me-2"
                                onClick={cancelUpdate}
                              >
                                <IconBs.BsArrowCounterclockwise className="fs-16" />
                              </button>
                            )}

                            {btnModify && index === artIndex ? (
                              <button
                                type="submit"
                                className="btn btn-success btn-sm box-sdw rounded-pill me-2"
                              >
                                {loadingUpdate && artIndex === index && (
                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                )}
                                <IconFa.FaSave />
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm box-sdw rounded-pill me-2"
                                onClick={() => modifyArt(article1, index)}
                              >
                                <IconFa.FaEdit />
                              </button>
                            )}

                            <button
                              type="button"
                              className="btn btn-danger btn-sm box-sdw rounded-pill"
                              onClick={() => deleteArt(article1.refArt!, index)}
                            >
                              {loadingDelete && artIndex === index && (
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

      <ModalConfirm
        show={showModalConfirmDelete}
        onHide={() => {
          setShowModalConfirmDelete(false);
        }}
        onAccept={onDeleteModalAccept}
      >
        Do you really want to delete this article ?
      </ModalConfirm>
    </div>
  );
};

export default Article;
