import React, { useContext } from "react";



interface AuthProps {}

export const Auth: React.FC<AuthProps> = ({
  children,
}: any) => {
  
    // make sure user is logged in here

  return <>{children}</>;
};