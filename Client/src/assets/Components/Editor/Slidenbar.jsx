import React from "react";
import logo from "../logo/Logo.png";
import UserList from "./UserList";
import SidebarFooter from "./SidebaeFooter";

function Sidebar({ clients, username, setUsername, roomId, isSidebarHovered, setIsSidebarHovered, navigate }) {
  return (
    <div
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
      className={`${isSidebarHovered ? "w-72" : "w-20"} 
                  bg-white/10 backdrop-blur-xl border-r border-white/10 
                  flex flex-col justify-between transition-all duration-600 
                  ease-in-out relative z-20`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-white/10">
        <img
          src={logo}
          alt="Logo"
          className={`h-[50px] w-auto object-contain transition-all duration-500 
                     ${isSidebarHovered ? "opacity-100 scale-110" : "opacity-60 scale-90"}`}
        />
      </div>

      {/* User List */}
      <UserList
        clients={clients}
        username={username}
        setUsername={setUsername}
        isSidebarHovered={isSidebarHovered}
      />

      {/* Footer Buttons */}
      <SidebarFooter
        roomId={roomId}
        isSidebarHovered={isSidebarHovered}
        navigate={navigate}
      />
    </div>
  );
}

export default Sidebar;
