import React from "react";
import { useAuthStore } from "../Store/UseStoreAuth";
import { MessageSquare } from "lucide-react";
import { LogOut } from "lucide-react";
import { Wrench } from "lucide-react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { PlugZap } from "lucide-react";
import { KeyRound } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="h-14">
      <nav className="h-full flex bg-base-200 justify-between items-center px-5">
        <div className="flex gap-3  items-center">
          <Link to="/">
            <MessageSquare className="size-7  bg-primary/10 text-primary   p-1 font-bold rounded-2xl" />
          </Link>
          <p className="font-bold text-content">
            <Link to="/">PingMe</Link>
          </p>
        </div>
        <div className="flex gap-10">
          <div className="flex items-center gap-2 text-primary-content bg-primary rounded-lg p-1 ">
            <Wrench className="cursor-pointer text-primary-content size-4 " />
            <span className="text-sm cursor-pointer font-medium hover:text-warning-content">
              <Link to="/settings">Setting</Link>
            </span>
          </div>
          {authUser ? (
            <div className="flex items-center gap-2 bg-primary text-primary-content p-1 rounded-lg">
              <User className="cursor-pointer size-4 text-primary-content" />
              <span className="text-sm cursor-pointer font-medium hover:text-warning-content">
                <Link to="/profile">Profile</Link>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2  bg-primary text-primary-content p-1 rounded-lg ">
              <PlugZap className="cursor-pointer size-4  text-primary-content" />
              <span className="text-sm cursor-pointer font-medium hover:text-warning-content">
                <Link to="/signup">Signup</Link>
              </span>
            </div>
          )}

          {authUser ? (
            <div className="flex items-center gap-2 text-primary-content bg-primary p-1 rounded-lg ">
              <button className="flex gap-2 items-center" onClick={logout}>
                <LogOut className="cursor-pointer size-4  text-primary-content" />
                <span className="text-sm cursor-pointer font-medium hover:text-warning-content">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-primary-content bg-primary p-1 rounded-lg">
              <KeyRound className="text-primary-content cursor-pointer size-4 " />
              <span className="text-sm cursor-pointer font-medium hover:text-warning-content">
                <Link to="/login">Login</Link>
              </span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
