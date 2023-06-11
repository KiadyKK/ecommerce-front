import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { required, validEmail, vpassword, vusername } from "./Validation";
const AuthService = require("../../../services/auth.service");

const SignUpMember = ({ onHide }) => {
  const form = useRef();
  const checkBtn = useRef();

  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
    roles: "Select role",
    secretCode: "",
  });
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSelectRole = async (e) => {
    setPerson({ ...person, roles: e });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const data = {
        username: person.username,
        email: person.email,
        password: person.password,
        roles: person.roles,
        secretCode: person.secretCode,
      };
      AuthService.signup(data).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
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

            <div className="form-group mt-3">
              <DropdownButton
              className="signup-dropdown"
                title={person.roles}
                id="dropdown-menu-align-right"
                onSelect={handleSelectRole}
              >
                <Dropdown.Item eventKey="Administrateur">
                  Administrateur
                </Dropdown.Item>
                <Dropdown.Item eventKey="Commercial">Commercial</Dropdown.Item>
                <Dropdown.Item eventKey="Comptable">Comptable</Dropdown.Item>
                <Dropdown.Item eventKey="Magasinier">Magasinier</Dropdown.Item>
              </DropdownButton>
            </div>

            {person.roles === "Administrateur" && (
              <div className="form-group mt-3">
                <Input
                  type="password"
                  className="form-control auth-input mb-1"
                  placeholder="Secret Code"
                  name="secretCode"
                  value={person.secretCode}
                  onChange={handleChange}
                  validations={[required]}
                />
              </div>
            )}

            <div className="form-group text-center my-4">
              <button className="sign-up-member">SIGN UP</button>
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

export default SignUpMember;
