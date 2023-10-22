import { FC, ReactElement } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getTheme } from "../../utils/functionUtil";
import { SUCCESS, INFO, ERROR } from "../../constant/constant";

const Toast: FC = (): ReactElement => {
  return <ToastContainer position="top-right" autoClose={5000} />;
};

export const showToast = (type: string, message: string) => {
  switch (type) {
    case SUCCESS:
      toast.success(message, {
        theme: getTheme(),
      });
      break;

    case INFO:
      toast.info(message, {
        theme: getTheme(),
      });
      break;

    case ERROR:
      toast.error(message, {
        theme: getTheme(),
      });
      break;

    default:
      break;
  }
};

export default Toast;
