import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required } from "./Validation";
const AuthService = require("../../../services/auth.service");

const SignIn = () => {

  const form = useRef();
  const checkBtn = useRef();

  const [person, setPerson] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const data = {
        username: person.username,
        password: person.password,
      };
      AuthService.signin(data).then(
        () => {
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="py-4 text-center">Welcome</h1>
      <Form className="px-5" onSubmit={handleSignIn} ref={form}>
        <div className="form-group">
          <Input
            type="text"
            className="form-control auth-input mb-1"
            placeholder="Username"
            name="username"
            value={person.username}
            onChange={handleChange}
            validations={[required]}
          />
        </div>

        <div className="form-group mt-3">
          <Input
            type="password"
            className="form-control auth-input mb-1"
            placeholder="Password"
            name="password"
            value={person.password}
            onChange={handleChange}
            validations={[required]}
          />
        </div>

        {message && (
          <div className="form-group">
            <h2>{message}</h2>
          </div>
        )}

        <div className="form-group text-center">
          <button className="sign-in mt-4" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            <span>SIGN IN</span>
          </button>
        </div>

        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </>
  );
};

export default SignIn;
