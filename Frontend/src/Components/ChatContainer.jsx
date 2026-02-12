import React, { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore";
import ChatHeader from "./ChatComponents/ChatHeader";
import ChatMessages from "./ChatComponents/ChatMessages";
import ChatGesture from "./ChatComponents/ChatGesture";
import MessageSkeleton from "./Skeletons/MessageSkeleton";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isMessagesLoading)
    return (
      <div className="flex flex-col w-full items-center justify-center h-[90vh]">
        <ChatHeader />
        <MessageSkeleton />
        <ChatGesture />
      </div>
    );
  return (
    <div className="w-full flex flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatGesture />
    </div>
  );
};

export default ChatContainer;
