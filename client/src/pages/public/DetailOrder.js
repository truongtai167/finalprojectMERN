import React, { memo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import withBase from "../../hocs/withBase";
import { useDispatch, useSelector } from "react-redux";
import { apiGetUserOrder } from "../../apis";
import defaultImage from "../../assets/Coming_Soon.png";
import { shifts } from "../../ultils/constants";
import { formatMoney } from "../../ultils/helpers";
import { Breadcrumb, Button } from "../../components";
import path from "../../ultils/path";
const DetailOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { current } = useSelector((state) => state.user);
  //   console.log(current);
  const [order, setOrder] = useState(null);
  const fetchPitchData = async () => {
    const response = await apiGetUserOrder(current?._id);
    // console.log(response.Booking);
    if (response.success) setOrder(response.Booking);
    // console.log(order);
  };
  useEffect(() => {
    fetchPitchData();
  }, []);
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My Order </h3>
          <Breadcrumb category={location?.pathname} />
        </div>
      </div>
      <div className="flex flex-col border my-8 w-main mx-auto">
        <div className="w-main mx-auto bg-gray-200  font-bold  py-3 grid grid-cols-10">
          <span className="col-span-6 w-full text-center">Pitches </span>
          <span className="col-span-1 w-full text-center">Shift </span>
          <span className="col-span-3 w-full text-center">Price </span>
        </div>
        {order?.map((el) => (
          <div
            key={el._id}
            className="w-main mx-auto font-bold border-b  py-3 grid grid-cols-10"
          >
            <span className="col-span-6 w-full text-center">
              <div className="flex gap-2">
                <img
                  src={el.pitch?.thumb || defaultImage}
                  alt="thumb"
                  className="w-28 h-28 object-cover"
                />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-main text-[15px]">
                    {el.pitch?.name}
                  </span>
                  <span className="text-[12px]">{el.pitch?.category}</span>
                </div>
              </div>
            </span>
            <span className="col-span-1 w-full h-full flex items-center justify-center text-center">
              <span className="text-[13px]">
                {shifts.find((s) => s.value === +el.shift)?.time}
              </span>
            </span>
            <span className="col-span-3 w-full h-full flex items-center justify-center text-center">
              <span className="text-base ">
                {formatMoney(el.pitch?.price) + ` VND`}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col mb-12 justify-center gap-3 items-end">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal:</span>
          <span className="text-main">
            {formatMoney(
              order?.reduce((sum, el) => sum + Number(el.pitch?.price), 0)
            ) + ` VND`}
          </span>
        </span>
        <span className="text-xs italic">
          taxes and discount calculated at check out form
        </span>
        <div className="flex gap-3">
          <Button
            handleOnClick={() => {
              navigate(`/${path.HOME}`);
            }}
            name="Book Other"
          />

          <Button
            handleOnClick={() => {
              //   dispatch(showOrder());
              navigate(`${path.DETAIL_ORDER}`);
            }}
            name="Check out "
          />
        </div>
      </div>
    </div>
  );
};

export default memo(DetailOrder);
