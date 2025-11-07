import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:max-w-4xl mx-auto 2xl:min-h-screen overflow-hidden lg:overflow-auto flex flex-col items-center justify-center w-full my-4">
      <div className="flex items-center justify-end w-full">
        <Link
          href={"/"}
          className="text-primary text-sm flex items-center justify-end gap-1 pb-1"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Back to Home Page
        </Link>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
