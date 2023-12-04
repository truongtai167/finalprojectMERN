import React, { memo, useRef, useEffect, useState } from "react";
import { voteOptions } from "../../ultils/constants";
import Button from "../Buttons/Button";
import icons from "../../ultils/icons";
import logo from "../../assets/logo.png";

const { AiFillStar } = icons;

const VoteOption = ({ namePitch, handleSubmitVoteOption }) => {
  const modelRef = useRef();
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    modelRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modelRef}
      className="bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center"
    >
      <img
        src={logo}
        alt="logo"
        className="w-[300px] my-8 object-contain"
      ></img>
      <h2 className="text-center text-medium text-lg">{`Voting pitch ${namePitch}`}</h2>
      <textarea
        className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
        placeholder="Type something"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p>How do you like this pitch?</p>
        <div className="flex justify-center gap-4 items-center">
          {voteOptions.map((el) => (
            <div
              className="w-[100px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md h-[100px] flex items-center 
                        justify-center flex-col gap-2"
              key={el.id}
              onClick={() => {
                setChosenScore(el.id);
                setScore(el.id);
              }}
            >
              {Number(chosenScore) && chosenScore >= el.id ? (
                <AiFillStar color="orange"></AiFillStar>
              ) : (
                <AiFillStar color="gray"></AiFillStar>
              )}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleOnClick={() => handleSubmitVoteOption({ comment, score })}
        fw
        name="Send"
      />
    </div>
  );
};

export default memo(VoteOption);
