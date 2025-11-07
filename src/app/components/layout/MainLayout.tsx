"use client";

import {Slide, ToastContainer} from "react-toastify";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const publicPaths = [
    "/users/login",
    "/users/registration",
    "/password/reset",
  ];
  const isAuthenticated = !publicPaths.includes(pathname);

  return (
    <>
      {isAuthenticated && <Navbar />}

      <div
        className={`font-medium`}
      >
        {children}
      </div>

      {/*  add error by bg color*/}
      <ToastContainer position="bottom-left" hideProgressBar autoClose={2000} transition={Slide} limit={5} theme="colored"
/>

      {isAuthenticated && <Footer />}
    </>
  );
}
