import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import ScrollToTop from "../Pages/Shared/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default RootLayout;
