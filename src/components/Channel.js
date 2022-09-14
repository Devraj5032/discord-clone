import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChannelInfo } from "../features/channelSlice";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    navigate(`/channels/${id}`)
  };

  return (
    <div
      onClick={setChannel}
      className="font-medium flex items-center cursor-pointer p-1 rounded-md hover:text-white hover:bg-[#3a3c43]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
        />
      </svg>{" "}
      {channelName}
    </div>
  );
}

export default Channel;
