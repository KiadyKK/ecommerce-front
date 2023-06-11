import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import useRoute from "../../hookCreated/useRoute";
import DetailsChilds from "./detailsChilds";
const ArticlesService = require("../../../../../services/articles.service");

const Details = () => {
  const [route] = useRoute(useLocation());

  return (
    <div className="h-100 container-fluid px-2">
      <div className="admin-menu-title bg-light">
        <h4>Détails articles</h4>
        <h6>
          {route.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.path}
                className="text-capitalize text-decoration-none"
              >
                {index === 0 ? "" + item.title : " > " + item.title}
              </Link>
            );
          })}
        </h6>
      </div>
      <div className="sub-right">
        <div className="row m-0 w-100 h-100">
          <div className="col-lg-4 mb-2 p-0">
            <div className="overflow-auto h-100 bg-light me-2 p-2">
              <DetailsChilds
                icon={<Icon.Boxes className="sub-right-title-icon" />}
                name={"Catégories"}
                getItem={ArticlesService.getCatArt}
                createItem={ArticlesService.createCatArt}
                deleteItem={ArticlesService.deleteCatArt}
              />
            </div>
          </div>
          <div className="col-lg-4 mb-2 p-0">
            <div className="overflow-auto h-100 bg-light me-2 p-2">
              <DetailsChilds
                icon={<Icon.BoxSeam className="sub-right-title-icon" />}
                name={"Conditionnements"}
                getItem={ArticlesService.getCondArt}
                createItem={ArticlesService.createCondArt}
                deleteItem={ArticlesService.deleteCondArt}
              />
            </div>
          </div>
          <div className="col-lg-4 mb-2 p-0">
            <div className="overflow-auto h-100 bg-light p-2">
              <DetailsChilds
                icon={<Icon.Bag className="sub-right-title-icon" />}
                name={"Unité de ventes"}
                getItem={ArticlesService.getUtvArt}
                createItem={ArticlesService.createUtvArt}
                deleteItem={ArticlesService.deleteUtvArt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
