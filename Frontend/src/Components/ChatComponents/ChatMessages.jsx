import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../Store/useChatStore";
import { useAuthStore } from "../../Store/UseStoreAuth";
import { formatMessageTime } from "../../lib/utils";

const ChatMessages = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef();
  useEffect(() => {
    if (messageEndRef.current && messages) {

      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])
  return (
    <div className="flex-1 overflow-y-auto space-y-1 px-5">
      {messages.map((message) => (
        <div
          key={message._id}
          ref={messageEndRef}
          className={`chat ${message?.senderId === authUser._id ? "chat-end" : "chat-start "
            }`}
        >
          <div className="chat-image avatar ">
            <div className="size-10 rounded-full border">
              <img
                src={`${message.senderId === authUser._id
                  ? authUser.profilePic
                  : selectedUser.profilePic
                    ? selectedUser.profilePic
                    : "/assets/user.jpg"
                  }`}
                alt=""
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="txet-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
          </div>
          <div className={`chat-bubble ${message?.senderId === authUser._id ? "bg-primary" : "bg-accent"
            } text-primary-content flex flex-col gap-2`}>
            {message?.image && (
              <img src={message?.image} alt="attachment" className="sm:max-w-[200px] rounded-md mb-2" />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
