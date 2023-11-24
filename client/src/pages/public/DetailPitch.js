import React from "react";
import { useParams } from "react-router-dom";
function DetailPitch() {
  const { pitchId } = useParams();
  console.log(pitchId);
  return <div>DetailPitch</div>;
}

export default DetailPitch;
