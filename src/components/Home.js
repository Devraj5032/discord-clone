import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Channel from "./Channel";
import logo from "./discord_logo.png";
import ServerIcon from "./ServerIcon";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { ChevronDownIcon, Cog6ToothIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from "@heroicons/react/24/solid";


function Home() {
  const [user] = useAuthState(auth);
  const [channels] = useCollection(db.collection("channels"));

  const handleAddChannel = () => {
    const channelName = prompt("Enter channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <>
      {!user && <Navigate to="/" />}
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max">
          <div className="server-default hover:bg-discord_blurple">
            <img src={logo} alt="" className="h-5 " />
          </div>
          <hr className="border-gray-700 border w-8 mx-auto" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          {/* <ServerIcon image="https://rb.gy/zxo0lz" />
          <ServerIcon image="https://rb.gy/qidcpp" />
          <ServerIcon image="https://rb.gy/zxo0lz" /> */}

          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className=" h-7 text-discord_green group-hover:text-white"/>
          </div>
        </div>
        <div className="bg-[#2f3136] flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373c] transition-all duration-100 ease-in-out cursor-pointer">
            Official iThink server....
            <ChevronDownIcon className="ml-2 h-5" />
          </h2>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 mb-2">
              <ChevronDownIcon className=" h-5 mr-2" />
              <h4 className="font-semibold">Channels</h4>
              <PlusIcon className="ml-auto h-6 cursor-pointer hover:text-white"
                onClick={handleAddChannel}/>
            </div>
            <div className="flex flex-col space-y-2 px-2 bg-4">
              {channels?.docs.map((doc) => (
                <Channel
                  key={doc.id}
                  id={doc.id}
                  channelName={doc.data().channelName}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#292b2f] flex p-2 justify-between items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img
                src={user?.photoURL}
                alt=""
                className="cursor-pointer h-10 rounded-full"
                
              />
              <h4 className="text-white text-xs font-medium">
                {user?.displayName}
                <span className="text-[#b9bbbe] block">
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className="text-gray-400 flex items-center">
              <div className="hover:bg-[#3a3c43] hover:text-[#dcddde] cursor-pointer p-2 rounded-md transition-all duration-100 ease-in-out">
                <MicrophoneIcon className="h-6 " />
              </div>
              <div className="hover:bg-[#3a3c43] hover:text-[#dcddde] cursor-pointer p-2 rounded-md transition-all duration-100 ease-in-out">
                <PhoneIcon className="h-6 "/>
              </div>
              <div className="hover:bg-[#3a3c43] hover:text-[#dcddde] cursor-pointer p-2 rounded-md transition-all duration-100 ease-in-out">
                <Cog6ToothIcon className="h-6 "/>
              </div>
            </div>
          </div>
            <button onClick={() => auth.signOut()} className="bg-discord_purple p-2 text-white rounded-md cursor-pointer">SignOut</button>
        </div>
        <div className="bg-[#36393f] flex-grow">
          <Chat/>
        </div>
      </div>
    </>
  );
}

export default Home;
