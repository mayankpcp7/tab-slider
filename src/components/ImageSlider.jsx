import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE_DATA, TAB_IMAGES } from "../utils/Helper";

const settings = {
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  fade: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
      },
    },
  ],
};

const ImageSlider = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sliderRef = useRef(null);

  // Handle slider changes
  const handleAfterChange = (current) => {
    setActiveTab(current);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  // Ensure that IMAGE_DATA and TAB_IMAGES are synced.
  // Create an array of images that will be displayed in the slider based on the TAB_IMAGES array.
  const imagesToShow = TAB_IMAGES.map((tabImage, index) => IMAGE_DATA[index]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center mb-10 font-semibold text-4xl text-black">
        TABS SLIDER
      </h2>

      <Slider
        ref={sliderRef}
        className="mx-auto"
        {...settings}
        initialSlide={activeTab}
        afterChange={handleAfterChange}
      >
        {imagesToShow.map((image, index) => (
          <div className="sizes-[100vw] mx-auto" key={image.id}>
            <img
              className="w-full h-[200px] md:h-[500px] object-cover"
              src={image.src}
              alt={`slide ${image.id}`}
            />
          </div>
        ))}
      </Slider>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center mt-10 md:mt-6">
        {TAB_IMAGES.map((image, index) => (
          <img
            key={index}
            src={image.imgSrc}
            className={`lg:w-[200px] w-[100px] h-[70px] lg:h-[100px] object-cover cursor-pointer ${
              activeTab === index ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
