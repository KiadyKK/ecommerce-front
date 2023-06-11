import React from "react";

const ForgotPwd = ({ onHide }) => {
  return (
    <>
      <h1 className="py-4 text-center">Forgot Password</h1>
      <button className="close text-center" onClick={onHide}>
        Back
      </button>
    </>
  );
};

export default ForgotPwd;
