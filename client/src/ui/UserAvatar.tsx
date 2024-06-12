import React, { useState } from "react";

export const avatarSizeMap = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "40px",
  xs: "20px",
  xxs: "30px",
};


export interface AvatarProps {
  src?: string;
  className?: string;
  username?: string;
  size?: keyof typeof avatarSizeMap;
}

export const UserAvatar: React.FC<AvatarProps> = ({
  src= "https://ui-avatars.com/api/&name&rounded=true&background=B23439&bold=true&color=FFFFFF",
  className = "",
  size = "sm",
  username,
}) => {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
    >
      <img alt={username ? `${username}-s-avatar` : "your-avatar"}
        className={`rounded-full w-full h-full object-cover`}
        src={src}
      />
      
    </div>
  );
};