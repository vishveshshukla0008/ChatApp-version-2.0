import React, { useEffect, useState } from "react";
import { useChatStore } from "../Store/useChatStore.js";
import SidebarLoadingSkeleton from "./Skeletons/SidebarLoadingSkeleton.jsx";
import { Users } from "lucide-react";
import { useAuthStore } from "../Store/UseStoreAuth.js";

const Sidebar = () => {
  const [onlineUserToggle, setOnlineUserToggle] = useState(false);
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const filteredUser = onlineUserToggle
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarLoadingSkeleton />;
  return (
    <aside className="h-full w-15 py-5 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="h-full w-full flex flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          <Users className="size-5 text-primary" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="onlineUsers-toggler mx-auto flex gap-3">
          <input
            type="checkbox"
            id="onlineToggler"
            checked={onlineUserToggle}
            onChange={() => setOnlineUserToggle(!onlineUserToggle)}
          />
          <label className="hidden lg:inline text-sm" htmlFor="onlineToggler">
            Show online Users Only{" "}
            <span className="text-green-600">({onlineUsers.length - 1})</span>
          </label>
        </div>
        {/*TODO : Online filter toggler*/}
        <div className="overflow-y-scroll  h-full w-full ">
          {filteredUser.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-2 max-md:p-2 flex items-center justify-center gap-0 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300   " : ""
                }`}
            >
              <div className="relative w-1/2  max-lg:w-full mx-auto ">
                <img
                  className="mx-auto size-9 object-cover rounded-full"
                  src={user.profilePic || "/assets/user.jpg"}
                  alt={user.fullname}
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute -top-1 max-lg:right-0 left-2/3  size-3 bg-green-500 rounded-full "></span>
                )}
              </div>

              <div className="hidden w-2/3 lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullname}</div>
                <div className="text-sm text-gray-500">
                  {onlineUsers.includes(user._id) ? (
                    <span className="text-green-600 font-bold">online</span>
                  ) : (
                    "offline"
                  )}
                </div>
              </div>
            </button>
          ))}
          {filteredUser.length == 0 ? (
            <p className="text-sm text-center ">No Online Users Present now</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
