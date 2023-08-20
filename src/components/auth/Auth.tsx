import { FC, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./Auth.scss";
import ChangePwd from "./authChilds/ChangePwd";
import ForgotPwd from "./authChilds/ForgotPwd";
import SignIn from "./authChilds/SignIn";
import SignUp from "./authChilds/SignUp";

type props = {
  show: boolean;
  onHide: () => void;
};

const Auth: FC<props> = (props) => {
  const [signIn, setSignIn] = useState<boolean>(true);
  const [changePwd, setChangePwd] = useState<boolean>(false);
  const [forgotPwd, setForgotPwd] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);

  return (
    <Modal
      className="auth-modal"
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
            <div className="separate my-3 mx-auto"></div>
            <h2 className="mb-2">Don't have an account ?</h2>
            <button
              className="sign-up mb-3"
              onClick={() => {
                setSignIn(false);
                setSignUp(true);
              }}
            >
              SIGN UP
            </button>
          </>
        )}
        {signUp && (
          <SignUp
            onHide={() => {
              setSignIn(true);
              setSignUp(false);
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
