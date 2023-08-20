import { Outlet, Navigate } from "react-router-dom";
import * as StorageService from "../services/storage.service";
import { FC, ReactElement } from "react";

const privateRoute: FC = (): ReactElement => {
  const token: string | null = StorageService.getItem("token");

  return token ? <Outlet /> : <Navigate to={"/home"} />;
};

export default privateRoute;
