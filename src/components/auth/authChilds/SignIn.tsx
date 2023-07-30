import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import * as PersonneService from "../../../services/personne.service";
import * as StorageService from "../../../services/storage.service";

interface person {
  username: string;
  mdp: string;
}

const SignIn: FC = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    mdp: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<person>({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit = (data: person) => {
    setMessage("");
    setLoading(true);

    PersonneService.signin(data).then(
      (response) => {
        StorageService.saveUser(response.data);
        window.location.reload();
      },
      (error) => {
        setMessage(error.response.data);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <h2 className="py-2 text-center">Welcome</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group px-4">
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

        <div className="form-group px-4 mt-3">
          <input
            type="password"
            {...register("mdp")}
            className={`form-control auth-input mb-0 ${
              errors.mdp ? "is-invalid" : ""
            }`}
            placeholder="Password"
          />
          <div className="text-start text-danger">{errors.mdp?.message}</div>
        </div>

        {message && (
          <div className="form-group mt-3">
            <h2>{message}</h2>
          </div>
        )}

        <div className="form-group text-center">
          <button type="submit" className="sign-in mt-4" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            <span>SIGN IN</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
