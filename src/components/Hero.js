import React from "react";
import img1 from "./img1_hero.svg"
import img2 from "./img2_hero.svg"

function Hero() {
  return (
    <div className="bg-discord_blue pb-8 md:pb-0">
      <div className="p-7 py-9 h-[88.7vh] md:h-[92vh] lg:h-[92vh] xl:h-[92vh] md:flex relative overflow-hidden">
        <div className="flex flex-col gap-7 text-white md:max-w-md lg:max-w-none lg:justify-center">
          <h1 className="text-5xl font-bold">IMAGINE A PLACE...</h1>
          <h2 className="text-lg font-light tracking-wide lg:max-w-3xl w-full">
          ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
          </h2>
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6">
            <button
              className="bg-white text-black w-60 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:text-discord_blurple focus:outline-none
            transition duration-200 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download for Mac
            </button>
            <button className="bg-gray-900 text-white w-72 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl  hover:bg-gray-800 focus:outline-none transition duration-200 ease-in-out">
              Open Discord in your browser
            </button>
          </div>
        </div>
        <div className="flex-grow">
            <img src={img1} alt="" className="absolute -left-36 mt-16 sm:-left-44 md:hidden bottom-0"/>
            <img src={img2} alt="" className="hidden md:inline md:absolute lg:top-64 lg:right-auto"/>
        </div>
      </div>
    </div>
  );
}

export default Hero;
