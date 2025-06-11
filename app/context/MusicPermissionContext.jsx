// context/MusicPermissionContext.js
"use client";

import { createContext, useContext, useState } from "react";

const MusicPermissionContext = createContext();

export function MusicPermissionProvider({ children }) {
  const [allowMusic, setAllowMusic] = useState(null);
  return (
    <MusicPermissionContext.Provider value={{ allowMusic, setAllowMusic }}>
      {children}
    </MusicPermissionContext.Provider>
  );
}

export function useMusicPermission() {
  const context = useContext(MusicPermissionContext);
  if (!context) {
    throw new Error("useMusicPermission must be used within a MusicPermissionProvider");
  }
  return context;
}
