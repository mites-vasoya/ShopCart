import React, { useEffect, useState } from "react";
import "./Images.css";
import Carousel from "react-material-ui-carousel";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Item({ item, setImage, setFullImgView }) {
  const handleImgClick = () => {
    setFullImgView(true);
    setImage(item);
  };

  return (
    <img
      src={item}
      alt="Images"
      className="carousel-image"
      onClick={handleImgClick}
      key={item}
    />
  );
}

function OneImage({ prodImage }) {
  const item = prodImage[0];
  return (
    <Carousel
      className="carousel-one-image-class"
      indicators={false}
      NextIcon={false}
      PrevIcon={false}
      navButtonsAlwaysInvisible={true}
    >
      <img
        src={item}
        alt="Images"
        className="carousel-one-image"
        style={{ boxShadow: "none" }}
      />
    </Carousel>
  );
}

function ImageSlider({ prodImage }) {
  let newImageData = [];
  const [image, setImage] = useState("");
  const [imgIndex, setImgIndex] = useState();
  const [fullImgView, setFullImgView] = useState(false);

  useEffect(() => {
    const index = prodImage.indexOf(image);

    if (prodImage.indexOf(image) > -1) {
      setFullImgView(true);
      setImgIndex(index);
    }
  }, [image]);

  const handleCloseBtn = () => {
    setFullImgView(false);
  };

  const handlePrevImgBtn = (e) => {
    e.stopPropagation();
    if (imgIndex - 1 >= 0) {
      setImgIndex(imgIndex - 1);
      setImage(prodImage[imgIndex - 1]);
    } else {
      setImgIndex(prodImage.length - 1);
      setImage(prodImage[prodImage.length - 1]);
    }
  };

  const handleNextImgBtn = (e) => {
    e.stopPropagation();
    if (imgIndex + 1 < prodImage.length) {
      setImgIndex(imgIndex + 1);
      setImage(prodImage[imgIndex + 1]);
    } else {
      setImgIndex(0);
      setImage(prodImage[0]);
    }
  };

  for (let index = 0; index < prodImage.length; index++) {
    const element = prodImage[index];
    newImageData.push(
      <img
        src={element}
        alt=""
        height="90px"
        width="100px"
        className="indicator-img"
        key={element}
      />
    );
  }

  return (
    <>
      <div className="carousel-class">
        <Carousel
          sx={{
            indicatorIcon: {
              border: "1px solid black",
            },
          }}
          height="700px"
          indicators
          navButtonsProps={{
            style: {
              backgroundColor: "black",
              borderRadius: "50%",
              opacity: "0.3",
            },
          }}
          IndicatorIcon={newImageData}
          indicatorIconButtonProps={{
            className: "indicator-icon-button",
            sx: {
              border: "1px solid rgba(26, 26, 26, 0.3)",
              borderRadius: "5px",
              padding: "5px",
              objectFit: "cover",
              marginLeft: "3px",
              marginRight: "3px",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              boxShadow: "0 0 8px 1px #00000088",
              borderRadius: "7px",
              transform: "scale(1.03)",
            },
          }}
          indicatorContainerProps={{
            style: {
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
              display: "flex",
              width: "fit-content",
              justifyContent: "space-evenly",
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
          navButtonsAlwaysVisible
        >
          {prodImage.map((item) => (
            <>
              <Item
                item={item}
                key={item}
                setImage={setImage}
                setFullImgView={setFullImgView}
              />
            </>
          ))}
        </Carousel>
      </div>
      {fullImgView ? (
        <>
          <div className="full-img-view" onClick={handleCloseBtn}>
            <div className="img-close-div" onClick={handleCloseBtn}>
              <CloseIcon sx={{ fontSize: "30px" }} />
            </div>
            <div className="full-img-view-card">
              <div className="full-img">
                <div
                  className="prev-img-btn"
                  onClick={(e) => handlePrevImgBtn(e)}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "50px" }} />
                </div>
                <div
                  className="next-img-btn"
                  onClick={(e) => handleNextImgBtn(e)}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: "50px" }} />
                </div>
              </div>
            </div>

            <div className="full-img">
              <img
                src={prodImage[imgIndex]}
                alt=""
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default function Images({ prodImage }) {
  if (prodImage !== undefined) {
    return <ImageSlider prodImage={prodImage} />;
  }
}

export const Image = ({ prodImage }) => {
  if (prodImage !== undefined) {
    return <OneImage prodImage={prodImage} />;
  }
};

export const ImageForCard = ({ prodImage }) => {
  if (prodImage !== undefined) {
    return (
      <>
        <Carousel
          className="carousel-one-image-for-card-class"
          indicators={false}
          NextIcon={false}
          PrevIcon={false}
          navButtonsAlwaysInvisible={true}
        >
          <img src={prodImage[0]} alt="Images" style={{ boxShadow: "none" }} />
        </Carousel>
      </>
    );
  }
};

export const ImageForList = ({ prodImage }) => {
  if (prodImage !== undefined) {
    return (
      <>
        <Carousel
          className="carousel-one-image-for-list"
          indicators={false}
          NextIcon={false}
          PrevIcon={false}
          navButtonsAlwaysInvisible={true}
        >
          <img
            src={prodImage[0]}
            alt="Images"
            className="carousel-image-for-list"
            style={{ boxShadow: "none", zIndex: "0" }}
          />
        </Carousel>
      </>
    );
  }
};

export const ImageForCart = ({ prodImage }) => {
  if (prodImage !== undefined) {
    return (
      <>
        <Carousel
          className="carousel-image-for-cart"
          indicators={false}
          NextIcon={false}
          PrevIcon={false}
          navButtonsAlwaysInvisible={true}
        >
          <img
            src={prodImage[0]}
            alt="Images"
            className="carousel-img-for-cart"
            style={{ boxShadow: "none", zIndex: "0" }}
          />
        </Carousel>
      </>
    );
  }
};
