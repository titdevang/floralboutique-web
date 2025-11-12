import ProfileSidebar from "../components/layout/profile/ProfileSidebar";
import { UserProfileProvider } from "../context/UserProfileContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"md:px-10 max-w-screen-xl mx-auto px-4 py-10"}>
      <UserProfileProvider>
        <div className="md:flex items-start w-full h-full gap-4">
          <ProfileSidebar />
          <div className="w-full h-full">{children}</div>
        </div>
      </UserProfileProvider>
    </div>
  );
}
