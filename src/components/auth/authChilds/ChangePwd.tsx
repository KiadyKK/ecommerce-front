import { FC } from "react";

type props = {
  onHide: () => void;
};

const ChangePwd: FC<props> = ({ onHide }) => {
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
