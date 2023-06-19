import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ImageSlider.css";

function Slider(props) {
  const images = props;
  return (
    <>
      <div className="carousel-wrapper">
        <Carousel
          showThumbs={false}
          indicators={false}
          navButtonsProps={{
            style: {
              backgroundColor: "black",
              borderRadius: "50%",
              opacity: "0.4",
            },
          }}
          indicatorIconButtonProps={{
            style: {
              padding: "10px", // 1
              color: "blue",
              zIndex: 5, // 3
            },
          }}
          animation="slide"
          duration={700}
          stopAutoPlayOnHover
          autoPlay = {false}
          navButtonsAlwaysVisible
        >
          <Link
            to={images.image[2].link}
            style={{ color: "#f0f3ed", textDecoration: "none" }}
          >
            <div className="image-slider-img-text">
              <input
                type="button"
                value="Smart Phones"
                className="smartphones"
              />
            </div>
            <div className="image-slider-img-div">
              <img
                src={images.image[2].url}
                className="image-slider-img"
                alt=""
              />
            </div>
          </Link>
          <Link
            to={images.image[0].link}
            style={{ color: "#f0f3ed", textDecoration: "none" }}
          >
            <div className="image-slider-img-text">
              <input
                type="button"
                value="Accessories"
                className="accessories"
              />
            </div>
            <div className="image-slider-img-div">
              <img
                src={images.image[0].url}
                className="image-slider-img"
                alt=""
              />
            </div>
          </Link>
          <Link
            to={images.image[1].link}
            style={{ color: "#f0f3ed", textDecoration: "none" }}
          >
            <div className="image-slider-img-text">
              <input type="button" value="Clothing" className="clothing" />
            </div>
            <div className="image-slider-img-div">
              <img
                src={images.image[1].url}
                className="image-slider-img"
                alt=""
              />
            </div>
          </Link>
        </Carousel>
      </div>
    </>
  );
}
function ImageSlider() {
  const Array = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/shoppingsite-e25c4.appspot.com/o/Home%20Page%20Images%2Fpexels-josh-sorenson-5349810.jpg?alt=media&token=5bbc56e8-e8d1-4024-8d73-a20ff5c1b20d",

      link: "/products?category=accessories",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/shoppingsite-e25c4.appspot.com/o/Home%20Page%20Images%2Fpexels-tembela-bohle-1884581.jpg?alt=media&token=3c960093-3e61-4dd2-8b13-d9eb4dfc29c8",
      link: "/products?category=clothes",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/shoppingsite-e25c4.appspot.com/o/Home%20Page%20Images%2Fwallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=1e1dd889-2cc7-44f5-bbef-a5eeb26064dd",
      link: "/products?category=smart phones",
    },
  ];
  return (
    <>
      <div className="image-slider" style={{ marginTop: "0px" }}>
        <Slider image={Array} />
      </div>
    </>
  );
}

export default ImageSlider;
