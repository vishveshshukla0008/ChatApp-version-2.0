import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../../Store/useChatStore";
import { useAuthStore } from "../../Store/UseStoreAuth";

const ChatHeader = () => {
    const { onlineUsers } = useAuthStore();
    const { selectedUser, setSelectedUser } = useChatStore();
    return (
        <div className="h-15 w-full bg-base-300 py-2 flex justify-between items-center px-3">
            <div className="h-full flex items-center gap-5 w-fit text-primary bg-base-200 rounded-3xl p-2">
                <div className="h-full flex items-center rounded-full overflow-hidden">
                    <img
                        className="h-full  rounded-full size-7"
                        src={`${selectedUser?.profilePic || "/assets/user.jpg"}`}
                        alt=""
                    />
                </div>
                <div className="w-fit">
                    <p className="text-wrap w-fit">{selectedUser?.fullname || ""}</p>
                    <p className="text-xs"> {onlineUsers.includes(selectedUser._id) && (
                        <span>online</span>
                    )}</p>
                </div>
            </div>
            <div className="">
                <X onClick={() => setSelectedUser(null)} />
            </div>
        </div>
    );
};

export default ChatHeader;
