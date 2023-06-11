import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import * as Icon from "react-bootstrap-icons";
import "./Home.css";

import Image1 from "../../assets/images/carousel/1.jpg";
import Image2 from "../../assets/images/carousel/2.jpg";
import Image3 from "../../assets/images/carousel/3.jpg";
import Image4 from "../../assets/images/carousel/4.jpg";
import Image5 from "../../assets/images/carousel/5.jpg";
import Image6 from "../../assets/images/carousel/6.jpg";

const ImageTab = [Image1, Image2, Image3, Image4, Image5, Image6];

const Home = () => {
  useEffect(() => {
    if (window.location.href.includes("shop")) {
      window.location = "#shop"
    }
  }, []);
  return (
    <div>
      <div className="getStart text-center">
        <p>GET START </p>
        <p>YOUR FAVORIT SHOPING</p>
        <hr />
        <button
          className="btn btn-primary btn-lg mt-5"
          onClick={() => (window.location.hash = "shop")}
        >
          <Icon.Cart3 className="me-1" /> shop{" "}
        </button>
      </div>
      <Carousel>
        {ImageTab.map((item, i) => {
          return (
            <Carousel.Item interval={3000} key={i}>
              <img className="d-block w-100" src={item} alt="Third slide" />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div id="shop">Shop list</div>
    </div>
  );
};

export default Home;
