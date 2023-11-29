import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { apiGetPitch, apiGetPitches } from "../../apis";
import {
  Breadcrumb,
  Button,
  PitchExtraInfo,
  PitchInformation,
  CustomSlider,
} from "../../components";
import ReactImageMagnify from "react-image-magnify";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../ultils/helpers";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function DetailPitch() {
  const { pitchId, title, category } = useParams();
  const [pitch, setPitch] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const fetchPitchData = async () => {
    const response = await apiGetPitch(pitchId);

    if (response.success) {
      setPitch(response.PitchData);
      setCurrentImage(response.PitchData?.images[0]);
    }
  };
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };
  useEffect(() => {
    if (pitchId) fetchPitchData();
  }, [pitchId]);

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold">{title}</h3>
          <Breadcrumb title={title} category={category}></Breadcrumb>
        </div>
      </div>
      <div className="w-main flex m-auto mt-4">
        <div className="flex flex-col gap-3 w-2/5 ">
          <img
            src={currentImage}
            alt="pitch"
            className="border h-[458px] w-[470px] object-cover"
          />
          <div className="w-[480px]">
            <Slider className="image-slider" {...settings}>
              {pitch?.images?.map((el) => (
                <div className="flex w-full gap-2" key={el}>
                  <img
                    onClick={(e) => handleClickImage(e, el)}
                    src={el}
                    alt="sub-pitch"
                    className="h-[143px] w-[150px] cursor-pointer border object-cover"
                  ></img>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 pr-[24px] gap-4">
          <h2 className="text-[30px] font-semibold">{pitch?.name}</h2>
          <h3 className="text-[30px] font-semibold">{`${formatMoney(
            formatPrice(pitch?.price)
          )} VNĐ`}</h3>
          <div className="flex items-center mt-2">
            {renderStarFromNumber(pitch?.totalRatings, 24)?.map((el) => (
              <span key={el}>{el}</span>
            ))}
          </div>
          <h2 className="font-semibold pt-2">Brand:</h2>
          <span>{pitch?.brand} </span>
          <h2 className="font-semibold pt-2">Description:</h2>
          <ul className="list-item text-justify text-sm text-gray-500">
            {pitch?.description}
          </ul>
          <h2 className="font-semibold">Address:</h2>

          <ul className="list-item text-sm text-gray-500">{pitch?.address}</ul>
        </div>
        <div className="flex-2 border border-green-500">info</div>
      </div>
      <div className="h-[300px]"> </div>
    </div>
  );
}

export default DetailPitch;
