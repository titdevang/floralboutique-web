import Image from "next/image";
import React from "react";

const PageNotFound = () => {
  return (
    <section className="text-center py-10">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full lg:w-1/2">
            <Image
              src="/assets/svg/404.svg"
              alt="Page not found"
              width={350}
              height={300}
              className="mx-auto mb-10 max-w-full"
            />
            <h1 className="text-3xl font-bold text-dark mb-4">
              Page Not Found!
            </h1>
            <p className="text-base text-muted mb-8">
              The page you are looking for has not been found on our server.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;