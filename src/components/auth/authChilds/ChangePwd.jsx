import React from "react";

const ChangePwd = ({onHide}) => {
  return (
    <>
      <h1 className="py-4 text-center">Change Password</h1>
      <button className="close text-center" onClick={onHide}>
        Back
      </button>
    </>
  );
};

export default ChangePwd;
