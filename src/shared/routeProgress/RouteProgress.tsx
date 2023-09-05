import { FC, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import "./RouteProgress.scss";

interface Iroute {
  title: string;
  path: string;
}

const RouteProgress: FC = (): ReactElement => {
  const location = useLocation();
  const href: string[] = location.pathname.split("/");
  href.shift();
  let path: string = "";
  let route: Array<Iroute> = [];

  for (const element of href) {
    path += "/" + element;
    const item: Iroute = { title: element, path: path };
    route.push(item);
  }

  return (
    <div className="arrow-wrapper">
      {route.map((item: Iroute, index: number) => {
        return (
          <div
            className={`step ${index === route.length - 1 ? "current" : ""}`}
            key={index}
          >
            <Link
              to={item.path}
              className="text-capitalize text-decoration-none"
            >
              {item.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RouteProgress;
