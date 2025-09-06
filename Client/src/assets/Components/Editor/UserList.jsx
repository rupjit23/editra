import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import Client from "../Pages/Client";

function UserList({ clients, username, setUsername, isSidebarHovered }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(username);

  const handleSaveName = () => {
    const clean = newName.trim();
    if (!clean) return;
    setUsername(clean);
    localStorage.setItem(`username:${clean}`, clean);
    setIsEditing(false);
  };

  return (
    <div className="p-5">
      {isSidebarHovered ? (
        <>
          <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase">Connected Users</h2>
          <div className="space-y-3">
            {clients.map((client) => (
              <div
                key={client.socketId}
                className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10"
              >
                {isEditing && client.socketId === 1 ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={handleSaveName}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                      autoFocus
                      className="flex-1 px-3 py-1.5 text-sm rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500"
                    />
                    <button onClick={handleSaveName} className="text-green-400">
                      <TiTick size={22} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Client username={client.username} />
                    {client.socketId === 1 && (
                      <button onClick={() => setIsEditing(true)} className="text-white/70 hover:text-indigo-400">
                        <FaEdit size={16} />
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xs text-slate-300">Users</h2>
          {clients.map((client) => (
            <div
              key={client.socketId}
              className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold"
              title={client.username}
            >
              {client.username.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
