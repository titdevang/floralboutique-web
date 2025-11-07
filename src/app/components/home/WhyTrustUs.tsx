import Image from "next/image";
import React from "react";

const WhyTrustUs = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={"/assets/images/why-trust-us.png"}
        alt="why trust us"
        height={1000}
        width={400}
        
      />
    </div>
  );
};

export default WhyTrustUs;
