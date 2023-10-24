import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactElement, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as IconAi from "react-icons/ai";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconGi from "react-icons/gi";
import * as IconMd from "react-icons/md";
import * as IconSl from "react-icons/sl";
import * as IconTb from "react-icons/tb";
import * as IconVsc from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { create } from "../../../../../../services/article.service";
import ErrorValidation from "../../../../../../shared/components/errorValidation/ErrorValidation";
import InputValidation from "../../../../../../shared/components/inputValidation/InputValidation";
import ReactSelectValidation from "../../../../../../shared/components/reactSelectValidation/ReactSelectValidation";
import { showToast } from "../../../../../../shared/components/toast/Toast";
import { ERROR, SUCCESS } from "../../../../../../shared/constant/constant";
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
import { AppDispatch } from "../../../../../../store";
import categorie from "../../../../../../types/categorie/categorie";
import conditionnement from "../../../../../../types/conditionnement/conditionnement";
import uniteVente from "../../../../../../types/uniteVente/uniteVente";
import "./ModalNewArticle.scss";

type props = {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
};

interface article {
  imgArt: any;
  refArt: string;
  desArt: string;
  dg: number;
  puHT: number;
  md: number;
  mg: number;
  categorie: categorie;
  conditionnement: conditionnement;
  uniteVente: uniteVente;
}

const validationSchema = Yup.object().shape({
  imgArt: Yup.mixed()
    .test("required", "Image is required", (value: any) => {
      return value.length > 0;
    })
    .test("fileSize", "File is too large", (value: any) => {
      return value && value[0]?.size <= 2048000;
    })
    .test("type", "Format image supported are : png, jpeg", (value: any) => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
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
  categorie: Yup.object()
    .shape({
      id: Yup.number().required("required"),
      catArt: Yup.string().required("required"),
    })
    .required("Category is required"),
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

const ModalNewArticle: FC<props> = (props): ReactElement => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState<number>(0);
  const [errorArt, setErrorArt] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<article>({
    resolver: yupResolver(validationSchema),
  });

  const loadingRetrieveCat = useSelector(categoryLoadingRetrieve);
  const listCat = useSelector(selectCategories);

  const loadingRetrieveCond = useSelector(conditionnementLoadingRetrieve);
  const listCond = useSelector(selectConditionnements);

  const loadingRetrieveUtv = useSelector(uniteVenteLoadingRetrieve);
  const listUtv = useSelector(selectUniteVentes);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(retrieveCategory(""));
    dispatch(retrieveConditionnement(""));
    dispatch(retrieveUniteVente(""));
  }, [dispatch]);

  const onChangeFile = (e: any) => {
    if (e.target.files[0]) setPreviewImage(URL.createObjectURL(e.target.files[0]));
    else setPreviewImage(undefined);

    resetError();
  };

  const resetError = () => setErrorArt(undefined);

  const cancel = () => {
    reset();
    props.onHide();
    resetError();
    setPreviewImage(undefined);
  };

  const onSubmit = (article: article) => {
    let formData = new FormData();
    const file = article.imgArt[0];
    formData.append("file", file);
    article.imgArt = article.imgArt[0].name;
    formData.append("data", JSON.stringify(article));

    create(formData, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((data) => {
        showToast(SUCCESS, `Article with reference ${article.refArt} created successfully !`);
        setProgress(0);
        props.onSubmit();
        reset();
        setPreviewImage(undefined);
      })
      .catch((errors) => {
        showToast(ERROR, errors.response.data);
        setErrorArt(errors.response.data);
        setProgress(0);
      });
  };

  return (
    <Modal
      className="modal-new-article"
      show={props.show}
      onHide={props.onHide}
      centered
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>New article</Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)} className="form-article">
        <Modal.Body>
          {previewImage && (
            <div className="text-center mb-3">
              <img className="preview" src={previewImage} alt="" />
            </div>
          )}
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconAi.AiFillPicture className="fs-18" />
                </span>
                <input
                  {...register("imgArt")}
                  type="file"
                  className={`input-validation form-control ${errors.imgArt ? "is-invalid" : ""}`}
                  placeholder="Choose image"
                  onChange={onChangeFile}
                />
              </div>
              {errors.imgArt && <ErrorValidation message={errors.imgArt?.message} />}
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconVsc.VscReferences className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("refArt") }}
                  error={errors.refArt}
                  placeholder="Reference"
                  resetError={resetError}
                />
              </div>
              {errors.refArt && <ErrorValidation message={errors.refArt?.message} />}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconTb.TbReportMoney className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("desArt") }}
                  error={errors.desArt}
                  placeholder="Designation"
                  resetError={resetError}
                />
              </div>
              {errors.desArt && <ErrorValidation message={errors.desArt?.message} />}
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconTb.TbSeparatorVertical className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("dg") }}
                  error={errors.dg}
                  placeholder="Detail/wholesale"
                  resetError={resetError}
                />
              </div>
              {errors.dg && <ErrorValidation message={errors.dg?.message} />}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconGi.GiPriceTag className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("puHT") }}
                  error={errors.puHT}
                  placeholder="Unit price [Ar]"
                  resetError={resetError}
                />
              </div>
              {errors.puHT && <ErrorValidation message={errors.puHT?.message} />}
            </div>
            <div className="col-md-6">
              {loadingRetrieveCat ? (
                <Skeleton className="select-skel" />
              ) : (
                <>
                  <div className="d-flex">
                    <span>
                      <IconMd.MdCategory className="fs-18" />
                    </span>
                    <ReactSelectValidation
                      register={{ ...register("categorie") }}
                      placeholder="Category"
                      options={listCat}
                      getOptionLabel={(option) => option.catArt}
                      setValue={setValue}
                      error={errors.categorie}
                    >
                      categorie
                    </ReactSelectValidation>
                  </div>
                  {errors.categorie && <ErrorValidation message={errors.categorie?.message} />}
                </>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconGi.GiCardboardBoxClosed className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("md") }}
                  error={errors.md}
                  placeholder="Detail margin [%]"
                  resetError={resetError}
                />
              </div>
              {errors.md && <ErrorValidation message={errors.md?.message} />}
            </div>
            <div className="col-md-6">
              {loadingRetrieveCond ? (
                <Skeleton className="select-skel" />
              ) : (
                <>
                  <div className="d-flex">
                    <span>
                      <IconBs.BsFillBoxSeamFill className="fs-18" />
                    </span>
                    <ReactSelectValidation
                      register={{ ...register("conditionnement") }}
                      placeholder="Conditioning"
                      options={listCond}
                      getOptionLabel={(option) => option.condArt}
                      setValue={setValue}
                      error={errors.conditionnement}
                    >
                      conditionnement
                    </ReactSelectValidation>
                  </div>
                  {errors.conditionnement && (
                    <ErrorValidation message={errors.conditionnement?.message} />
                  )}
                </>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconFa.FaBoxes className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("mg") }}
                  error={errors.mg}
                  placeholder="Wholesale margin [%]"
                  resetError={resetError}
                />
              </div>
              {errors.mg && <ErrorValidation message={errors.mg?.message} />}
            </div>
            <div className="col-md-6">
              {loadingRetrieveUtv ? (
                <Skeleton className="select-skel" />
              ) : (
                <>
                  <div className="d-flex">
                    <span>
                      <IconBs.BsFillCartPlusFill className="fs-18" />
                    </span>
                    <ReactSelectValidation
                      register={{ ...register("uniteVente") }}
                      placeholder="Sales unit"
                      options={listUtv}
                      getOptionLabel={(option) => option.utvArt}
                      setValue={setValue}
                      error={errors.uniteVente}
                    >
                      uniteVente
                    </ReactSelectValidation>
                  </div>
                  {errors.uniteVente && <ErrorValidation message={errors.uniteVente?.message} />}
                </>
              )}
            </div>
          </div>

          {errorArt && <p className="fs-14 text-danger text-center my-3">{errorArt}</p>}
        </Modal.Body>
        <div className="progress">
          <div className="progress-bar" style={{ width: progress + "%" }}></div>
        </div>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light-dark btn-sm d-flex align-items-center"
            onClick={cancel}
          >
            <IconSl.SlClose className="fs-18 me-1" />
            Cancel
          </button>
          <button type="submit" className="btn btn-success btn-sm">
            <IconBs.BsCheckCircle className="fs-18 me-1" />
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalNewArticle;
