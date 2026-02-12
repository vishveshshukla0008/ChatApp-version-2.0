import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-col gap-3  justify-center items-center">
      <MessageSquare className="animate-bounce mx-auto text-primary bg-primary/10  size-12  p-2 mb-3 font-bold rounded-2xl" />
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-2xl font-medium">Welcome to Chatty !</p>
        <p className="text-primary text-sm text-center">
          Select a coversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
