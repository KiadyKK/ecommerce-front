import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as IconBs from "react-icons/bs";
import * as IconFa from "react-icons/fa";
import * as IconHi2 from "react-icons/hi2";
import * as IconMd from "react-icons/md";
import * as IconRi from "react-icons/ri";
import * as IconSl from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorValidation from "../../../../../shared/components/errorValidation/ErrorValidation";
import InputValidation from "../../../../../shared/components/inputValidation/InputValidation";
import { AGENCY } from "../../../../../shared/constant/constant";
import {
  agenceLoadingCreate,
  createAgence,
  agenceError,
  resetError,
} from "../../../../../slices/agenceSlice";
import { AppDispatch } from "../../../../../store";
import agenceNew from "../../../../../types/agence/agenceNew";
import "./ModalNewAgence.scss";

type props = {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
};

const validationSchema = Yup.object().shape({
  abrAgc: Yup.string().required("Abbreviation is required"),
  agc: Yup.string().required("Agency is required"),
  telAgc: Yup.string().required("Tel is required"),
  addAgc: Yup.string().required("Address is required"),
  mdp: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmMdp: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("mdp")], "Confirm Password does not match"),
});

const ModalNewAgence: FC<props> = (props): ReactElement => {
  const errorAgc = useSelector(agenceError);
  const loadingCreate = useSelector(agenceLoadingCreate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<agenceNew>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (agence: agenceNew) => {
    const res = await dispatch(createAgence(agence));

    if (res.meta.requestStatus === "fulfilled") {
      props.onHide();
      reset();
    }
  };

  return (
    <Modal
      className="modal-new-agence"
      show={props.show}
      onHide={props.onHide}
      centered
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>New agency</Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)} className="form-agence">
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconMd.MdOutlineAbc className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("abrAgc") }}
                  error={errors.abrAgc}
                  placeholder="Abbreviation"
                  resetError={() => dispatch(resetError())}
                />
              </div>
              {errors.abrAgc && <ErrorValidation message={errors.abrAgc?.message} />}
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconHi2.HiHome className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("agc") }}
                  error={errors.agc}
                  placeholder={AGENCY}
                  resetError={() => dispatch(resetError())}
                />
              </div>
              {errors.agc && <ErrorValidation message={errors.agc?.message} />}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconBs.BsFillTelephoneFill className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("telAgc") }}
                  error={errors.telAgc}
                  placeholder="Phone"
                  resetError={() => dispatch(resetError())}
                />
              </div>
              {errors.telAgc && <ErrorValidation message={errors.telAgc?.message} />}
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconFa.FaAddressCard className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("addAgc") }}
                  error={errors.addAgc}
                  placeholder="Address"
                  resetError={() => dispatch(resetError())}
                />
              </div>
              {errors.addAgc && <ErrorValidation message={errors.addAgc?.message} />}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconRi.RiLockPasswordFill className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("mdp") }}
                  error={errors.mdp}
                  type="password"
                  placeholder="Password"
                  resetError={() => dispatch(resetError())}
                />
              </div>
              {errors.mdp && <ErrorValidation message={errors.mdp?.message} />}
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <IconMd.MdConfirmationNumber className="fs-18" />
                </span>
                <InputValidation
                  register={{ ...register("confirmMdp") }}
                  error={errors.confirmMdp}
                  type="password"
                  placeholder="Confirm password"
                  resetError={() => dispatch(resetError())}
                />
              </div>
              {errors.confirmMdp && <ErrorValidation message={errors.confirmMdp?.message} />}
            </div>
          </div>

          {errorAgc && <p className="fs-14 text-danger text-center my-3">{errorAgc}</p>}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light-dark btn-sm d-flex align-items-center"
            onClick={() => {
              reset();
              dispatch(resetError());
              props.onHide();
            }}
          >
            <IconSl.SlClose className="fs-18 me-1" />
            Cancel
          </button>
          <button type="submit" className="btn btn-success btn-sm">
            {loadingCreate && <span className="spinner-border spinner-border-sm me-1"></span>}
            <IconBs.BsCheckCircle className="fs-18 me-1" />
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalNewAgence;
