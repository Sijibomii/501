import React from "react";
import Header from "next/head";
import { NextPage } from "next";
export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  owner?: string;
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Transport Management System",
  embed,
}: any) => {
  return (
    <Header>
      {title ? <title>{title} | SMART TMS</title> : <title>SMART TMS</title>}
      <meta name="description" content={description} />
      
      <meta name="theme-color" content={embed?.hexColor || "#363D59"} />
      {embed ? (
        <>
          <meta name="og:title" content={title || "Smart Transport Management System"} />
          
          <meta name="og:description" content={description} />
          <meta name="og:site_name" content="Smart Transport Management System" />
        </>
      ) : (
        ""
      )}
    </Header>
  );
};