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
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../ultils/helpers";
function DetailPitch() {
  const { pitchId, title, category } = useParams();
  const [pitch, setPitch] = useState(null);
  const fetchPitchData = async () => {
    const response = await apiGetPitch(pitchId);
    if (response.success) {
      setPitch(response.pitchData);
    }
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
    </div>
  );
}

export default DetailPitch;
