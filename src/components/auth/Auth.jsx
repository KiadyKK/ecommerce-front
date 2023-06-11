import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SignIn from "./authChilds/SignIn";
import ChangePwd from "./authChilds/ChangePwd";
import ForgotPwd from "./authChilds/ForgotPwd";
import SignUpCustomer from "./authChilds/SignUpCustomer";
import SignUpMember from "./authChilds/SignUpMember";
import "./Auth.scss";

const Auth = (props) => {
  const [signIn, setSignIn] = useState(true);
  const [changePwd, setChangePwd] = useState(false);
  const [forgotPwd, setForgotPwd] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const [signUpCustomer, setSignUpCustomer] = useState(false);
  const [signUpMember, setSignUpMember] = useState(false);

  return (
    <Modal
      className='auth-modal'
      {...props}
      centered
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className="text-white text-center">
        {signIn && (
          <>
            <SignIn />
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-6">
                  <button
                    className="change-forgot-password"
                    onClick={() => {
                      setSignIn(false);
                      setChangePwd(true);
                    }}
                  >
                    <h6>Change password</h6>
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="change-forgot-password"
                    onClick={() => {
                      setSignIn(false);
                      setForgotPwd(true);
                    }}
                  >
                    <h6>Forgot password</h6>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {changePwd && (
          <ChangePwd
            onHide={() => {
              setChangePwd(false);
              setSignIn(true);
            }}
          />
        )}
        {forgotPwd && (
          <ForgotPwd
            onHide={() => {
              setForgotPwd(false);
              setSignIn(true);
            }}
          />
        )}
        {signUp && (
          <>
            <div className="separate my-4 mx-auto"></div>
            <h2 className="mb-4">Don't have an account ?</h2>
            <div className="container">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h5>Customer</h5>
                  <button
                    className="sign-up-customer mt-2"
                    onClick={() => {
                      setSignIn(false);
                      setSignUp(false);
                      setSignUpCustomer(true);
                    }}
                  >
                    SIGN UP
                  </button>
                </div>
                <div className="col-md-6 mb-5">
                  <h5>Member</h5>
                  <button
                    className="sign-up-member mt-2"
                    onClick={() => {
                      setSignIn(false);
                      setSignUp(false);
                      setSignUpMember(true);
                    }}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {signUpCustomer && (
          <SignUpCustomer
            onHide={() => {
              setSignUpCustomer(false);
              setSignIn(true);
              setSignUp(true);
            }}
          />
        )}
        {signUpMember && (
          <SignUpMember
            onHide={() => {
              setSignUpMember(false);
              setSignIn(true);
              setSignUp(true);
            }}
          />
        )}
        <div>
          <button className="close text-center" onClick={props.onHide}>
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Auth;
