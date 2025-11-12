import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  pathname: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pathname }) => {
  if (pathname === "/") {
    return null;
  }

  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" className="pb-4 md:px-0 text-sm">
      <ol className="list-none p-0 inline-flex flex-wrap">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-primary hover:brightness-125 transition-all"
          >
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const title = decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <li key={href} className="flex items-center text-[16px]">
              <span className="mx-2 text-primary">/</span>
              {isLast ? (
                <span className="text-primary transition-colors font-semibold">
                  {title}
                </span>
              ) : (
                <Link href={href} className="text-primary transition-colors">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
