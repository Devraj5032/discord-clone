import React, { useRef } from "react";
import {
  UserIcon,
  BellIcon,
  HashtagIcon,
  ChatBubbleOvalLeftIcon,
  MagnifyingGlassCircleIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  GiftIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectChannelId, selectChanneName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChanneName);
  const [user] = useAuthState(auth);
  const inputRef = useRef("");
  const chatRef = useRef(null);
  const [messages] = useCollection(
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (inputRef.current.value !== "") {
      db.collection("channels").doc(channelId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
      });
    }

    inputRef.current.value = "";
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-700 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="cursor-pointer w-6 h-6 text-[#72767d]" />
          <ChatBubbleOvalLeftIcon className="cursor-pointer w-6 h-6 text-[#72767d]" />
          <UserIcon className="cursor-pointer w-6 h-6 text-[#72767d]" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white pl-1 placeholder-[#72767d]"
            />
            <MagnifyingGlassCircleIcon className="cursor-pointer h-4 text-[#76767d] mr-1" />
          </div>
          <InboxIcon className="cursor-pointer h-6 text-[#76767d] mr-1" />
          <QuestionMarkCircleIcon className="cursor-pointer h-6 text-[#76767d] mr-1" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {/* <Message /> */}
        {/* {console.log(messages)} */}
        {messages?.docs.map((doc) => {
          const { message, timestamp, name, photoURL, email } = doc.data();

          return (
            <Message key={doc.id}
            id={doc.id}
            message={message}
            timestamp={timestamp}
            name={name}
            photoURL={photoURL}
            email={email} />
          );
        })}
        <div ref={chatRef} className="pb-16" />
      </main>
      <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="w-6 h-6 text-[#72767d] mr-4 cursor-pointer" />
        <form className="flex-grow ">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName} ` : "Select channel"
            }
            className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="w-6 h-6 text-[#72767d] cursor-pointer" />
        <FaceSmileIcon className="w-6 h-6 text-[#72767d] cursor-pointer" />
      </div>
    </div>
  );
}

export default Chat;
