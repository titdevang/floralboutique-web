import ProfileSidebar from "../components/layout/ProfileSidebar";
import { UserProfileProvider } from "../context/UserProfileContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"container py-10"}>
      <UserProfileProvider>
        <div className="flex items-start w-full h-full gap-4">
          <ProfileSidebar />
          <div className="w-full h-full">{children}</div>
        </div>
      </UserProfileProvider>
    </div>
  );
}
