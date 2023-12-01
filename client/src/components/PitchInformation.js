import React, { memo, useState, useCallback, useEffect } from "react";
import { pitchInforTabs } from "../ultils/constants";
import Swal from "sweetalert2";
import path from "../ultils/path";
import { useNavigate } from "react-router-dom";
import { showModel } from "../store/app/appSlice";
import { VoteBar, Button, Comment, VoteOption } from "./";
import { useDispatch, useSelector } from "react-redux";
import { renderStarFromNumber } from "../ultils/helpers";
import { apiRatings } from "../apis/pitch";
const PitchInformation = ({
  totalRatings,
  ratings,
  namePitch,
  pid,
  rerender,
}) => {
  // const activedStyles = "";
  // const notActivedStyles = "";

  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const handleSubmitVoteOption = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert("Please vote when click submit");
      return;
    }
    console.log(pid);
    await apiRatings({
      star: score,
      comment,
      pitchId: pid,
      updatedAt: Date.now(),
    });

    dispatch(
      showModel({
        isShowModel: false,
        modelChildren: null,
      })
    );
    rerender();
  };

  const handleVoteNow = () => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to vote",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Oops!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      //   console.log(isLoggedIn);
      dispatch(
        showModel({
          isShowModel: true,
          modelChildren: (
            <VoteOption
              namePitch={namePitch}
              handleSubmitVoteOption={handleSubmitVoteOption}
            ></VoteOption>
          ),
        })
      );
    }
  };
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {pitchInforTabs.map((el) => (
          <span
            className={`py-2 px-4 cursor-pointer ${
              activedTab === +el.id
                ? "bg-red-500 border border-b-0"
                : "bg-gray-200"
            } `}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
        {/* <span
          className={`py-2 px-4 cursor-pointer ${
            activedTab === 5 ? "bg-red-500 border border-b-0" : "bg-gray-200"
          } `}
          // key={el.id}
          onClick={() => setActivedTab(5)}
        >
          REVIEW
        </span> */}
      </div>
      <div className="w-full border p-4">
        {pitchInforTabs.some((el) => el.id === activedTab) &&
          pitchInforTabs
            .find((el) => el.id === activedTab)
            ?.content?.map((e) => (
              <li className="leading-6" key={e}>
                {e}
              </li>
            ))}
      </div>
      <div className=" flex flex-col p-4">
        <div className="flex">
          <div className="flex-4  flex-col flex items-center justify-center border ">
            <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
            <span className="flex items-center gap-2 mt-1">
              {renderStarFromNumber(totalRatings)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span className="text-sm mt-2">{`${ratings?.length} reviewers`}</span>
          </div>
          <div className="flex-6 border flex gap-2 flex-col p-4">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <VoteBar
                  key={el}
                  number={el + 1}
                  ratingTotal={ratings?.length}
                  ratingCount={
                    ratings?.filter((i) => i.star === el + 1)?.length
                  }
                />
              ))}
          </div>
        </div>
        <div className="p-4 flex items-center justify-center text-sm flex-col gap-2">
          <span>Do you review this pitch?</span>
          <Button name="Rate now" handleOnClick={handleVoteNow} />
        </div>
        <div className="flex flex-col gap-4">
          {ratings?.map((el) => (
            <Comment
              key={el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={`${el.postedBy?.name}`}
            ></Comment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(PitchInformation);
