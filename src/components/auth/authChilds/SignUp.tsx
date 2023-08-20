import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import * as PersonneService from "../../../services/personne.service";

type props = {
  onHide: () => void;
};

interface personne {
  username: string;
  email: string;
  mdp: string;
  confirmMdp: string;
  role: string | undefined;
  secretCode: string | undefined;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  mdp: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmMdp: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("mdp")], "Confirm Password does not match"),
  role: Yup.string(),
  secretCode: Yup.string(),
});

const SignUp: FC<props> = ({ onHide }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<personne>({
    resolver: yupResolver(validationSchema),
  });

  const onRolesChange = (e: any): void => {
    const value = e.target.value;
    value === "Administrateur" ? setIsAdmin(true) : setIsAdmin(false);
    setValue("role", e.target.value, { shouldValidate: true });
  };

  const onSubmit = (data: personne) => {
    setMessage("");
    setSuccessful(false);
    setLoading(true);

    PersonneService.signup(data).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
      },
      (error) => {
        setMessage(error.response.data);
        setSuccessful(false);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <h2 className="py-2 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4">
        {!successful && (
          <div>
            <div className="form-group mt-3">
              <input
                type="text"
                {...register("username")}
                className={`form-control auth-input mb-0 ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Username"
              />
              <div className="text-start text-danger py-1">
                {errors.username?.message}
              </div>
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                {...register("email")}
                className={`form-control auth-input mb-0 ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Email"
              />
              <div className="text-start text-danger py-1">
                {errors.email?.message}
              </div>
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                {...register("mdp")}
                className={`form-control auth-input mb-0 ${
                  errors.mdp ? "is-invalid" : ""
                }`}
                placeholder="Password"
              />
              <div className="text-start text-danger py-1">
                {errors.mdp?.message}
              </div>
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                {...register("confirmMdp")}
                className={`form-control auth-input mb-0 ${
                  errors.confirmMdp ? "is-invalid" : ""
                }`}
                placeholder="Confirm Password"
              />
              <div className="text-start text-danger py-1">
                {errors.confirmMdp?.message}
              </div>
            </div>

            <div className="form-group mt-3">
              <select
                {...register("role")}
                className="form-select signup-dropdown"
                onChange={onRolesChange} // Using setValue
                defaultValue="Role"
              >
                <option value="Role" disabled hidden>
                  Role
                </option>
                <option value="Administrateur">Administrateur</option>
                <option value="Comptable">Comptable</option>
                <option value="Commercial">Commercial</option>
                <option value="Magasinier">Magasinier</option>
                <option value="Utilisateur">Utilisateur</option>
              </select>
              <div className="text-start text-danger py-1">
                {errors.role?.message}
              </div>
            </div>

            {isAdmin && (
              <div className="form-group mt-3">
                <input
                  type="password"
                  {...register("secretCode")}
                  className={`form-control auth-input mb-0 ${
                    errors.secretCode ? "is-invalid" : ""
                  }`}
                  placeholder="Secret code"
                />
                <div className="text-start text-danger py-1">
                  {errors.secretCode?.message}
                </div>
              </div>
            )}

            <div className="form-group text-center my-4">
              <button type="submit" className="sign-up">
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                <span>SIGN UP</span>
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group mb-4">
            <h2>{message}</h2>
          </div>
        )}
      </form>
      <button className="close text-center mb-4" onClick={onHide}>
        Back
      </button>
    </>
  );
};

export default SignUp;
