import {AddressProvider} from "@/app/context/AddressContext";
import {LocationHierarchyProvider} from "@/app/context/LocationHierarchyContext";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LocationHierarchyProvider>
            <AddressProvider>
                <div className="w-full h-full">{children}</div>
            </AddressProvider>
        </LocationHierarchyProvider>
    );
}
