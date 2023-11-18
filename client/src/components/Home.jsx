// Home.js
import React from "react";
import Header from "./header/Header";
import ResponsiveImage from "./ResponsiveImage";

const Home = () => {
  return (
    <div>
      <Header />
      <ResponsiveImage
        desktopImage="/images/DesktopBanner.png"
        mobileImage="/images/MobileBanner.png"
      />
      <div style={{ padding: "20px", textAlign: "center" }}></div>
    </div>
  );
};

export default Home;
