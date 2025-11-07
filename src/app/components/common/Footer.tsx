import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary text-white pt-10 pb-5 lg:px-20 px-5">
      <div className=" sm:grid grid-cols-4">
        <div className="md:flex justify-center md:mt-0 mt-4">
          <div>
            <h2 className="md:pb-2 pb-1 font-semibold text-sm">Quick links</h2>
            <div className="flex flex-col gap-1">
              {/* <Link href={"/"}>About Us</Link>
              <Link href={"/"}>Contact Us</Link>
              <Link href={"/"}>FAQs</Link>
              <Link href={"/"}>Blogs</Link> */}
              <p>About Us</p>
              <p>Contact Us</p>
              <p>FAQs</p>
              <p>Blogs</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:items-center md:mt-0 mt-4 text-sm">
          <Link href={"/"} className="pb-2 font-semibold">
            Terms and Conditions
          </Link>
          <Link href={"/"} className="pb-2 font-semibold">
            Privacy Policy
          </Link>
        </div>
        <div className="md:flex justify-center md:mt-0 mt-4">
          <div>
            <h2 className="md:pb-2 pb-1 font-semibold text-sm">
              Available Cities
            </h2>
            <div className="flex flex-col gap-1">
              {/* <Link href={"/"}>Mumbai</Link>
              <Link href={"/"}>Bangalore</Link>
              <Link href={"/"}>Delhi</Link>
              <Link href={"/"}>Pune</Link> */}

              <p>Mumbai</p>
              <p>Bangalore</p>
              <p>Delhi</p>
              <p>Pune</p>
            </div>
          </div>
        </div>
        {/* <div className="md:flex flex-col items-center justify-center md:mt-0 mt-4">
          <h2 className="text-xl">Follow us</h2>
          <div className="flex items-center gap-2">
            <Link href={"/"}>F</Link>
            <Link href={"/"}>I</Link>
            <Link href={"/"}>P</Link>
          </div>
        </div> */}
      </div>
      <div className="text-center mt-8 text-[15px]">
        <span className="md:px-4 px-2 border-r">100% Secure Shopping </span>
        <span className="md:px-4 px-2">Payment Methods</span>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">
          Copyright Information: (© [2025] Floralboutique All Rights Reserved.)
        </p>
      </div>
    </div>
  );
};

export default Footer;
