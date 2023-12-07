import paypal from "../../assets/paypal.png";
import React, { memo, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { showOrder } from "../../store/app/appSlice";
import { useNavigate } from "react-router-dom";
import withBase from "../../hocs/withBase";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetUserOrder,
  apiDeleteOrder,
  apiGetUserOrderStatus,
} from "../../apis";
import defaultImage from "../../assets/Coming_Soon.png";
import { shifts } from "../../ultils/constants";
import { formatMoney } from "../../ultils/helpers";

import { Paypal, Button, Congratulation } from "../../components";
import { toast } from "react-toastify";
import path from "../../ultils/path";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((state) => state.user);
  //   console.log(current);
  const [order, setOrder] = useState(null);
  // const [orderIds, setOrderIds] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fetchPitchData = async () => {
    const response = await apiGetUserOrderStatus(current?._id);
    // console.log(response.Booking);
    if (response.success) setOrder(response.Booking);
    // console.log("order", order);
  };
  useEffect(() => {
    fetchPitchData();
  }, []);
  useEffect(() => {
    // const orderIds = order?.map((item) => ({ id: item._id }));
    // console.log("orderIds", orderIds);
    // setOrderIds(orderIds);
    // console.log("order", order);
  }, [order]);
  return (
    <div className="py-8 w-full grid grid-cols-10  h-full max-h-screen overflow-y-auto gap-6">
      {isSuccess && <Congratulation />}
      <div className="w-full flex justify-center items-center col-span-4">
        <img src={paypal} alt="" className="h-[70%] object-contain" />
      </div>
      <div className="flex w-full flex-col items-center  col-span-6 gap-6">
        <h2 className="text-2xl font-bold">CheckOut Your Order</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="border bg-gray-200 ">
              <th className="text-left p-2">Pitches</th>
              <th className="text-center p-2">Shift</th>
              <th className="text-right p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((el) => (
              <tr className="border" key={el._id}>
                <td className="text-left p-2">{el.pitch?.name}</td>
                <td className="text-center p-2">
                  {shifts.find((s) => s.value === +el.shift)?.time}
                </td>
                <td className="text-right p-2">
                  {formatMoney(el.pitch?.price) + ` VND`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <span className="flex items-center gap-8 text-sm">
            <span>Subtotal:</span>
            <span className="text-main">
              {formatMoney(
                order?.reduce((sum, el) => sum + Number(el.pitch?.price), 0)
              ) + ` VND`}
            </span>
          </span>
        </div>
        <div className="w-full mx-auto  ">
          <Paypal
            payload={{ order: order }}
            setIsSuccess={setIsSuccess}
            amount={Math.round(
              order?.reduce((sum, el) => sum + Number(el.pitch?.price), 0) /
                23500
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
