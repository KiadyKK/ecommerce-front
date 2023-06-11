import React, { useRef, useState } from "react";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { required, validEmail, vpassword, vusername } from "./Validation";
const AuthService = require("../../../services/auth.service");

const SignUpCustomer = ({ onHide }) => {
  const form = useRef();
  const checkBtn = useRef();

  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const data = {
        username: person.username,
        email: person.email,
        password: person.password,
      };
      try {
        const response = await AuthService.signup(data);
        setMessage(response.data.message);
        setSuccessful(true);
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    }
  };

  return (
    <>
      <h1 className="py-4 text-center">Sign Up</h1>
      <Form className="px-5" onSubmit={handleSignup} ref={form}>
        {!successful && (
          <div>
            <div className="form-group">
              <Input
                type="text"
                className="form-control auth-input mb-1"
                placeholder="Username"
                name="username"
                value={person.username}
                onChange={handleChange}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group mt-3">
              <Input
                type="text"
                className="form-control auth-input mb-1"
                placeholder="Email"
                name="email"
                value={person.email}
                onChange={handleChange}
                validations={[required, validEmail]}
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
                validations={[required, vpassword]}
              />
            </div>

            <div className="form-group text-center my-4">
              <button className="sign-up-customer">SIGN UP</button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group mb-4">
            <h2>{message}</h2>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <button className="close text-center mb-4" onClick={onHide}>
        Back
      </button>
    </>
  );
};

export default SignUpCustomer;
