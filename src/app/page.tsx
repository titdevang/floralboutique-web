import HomeClient from "./components/home/HomeClient";
import { HomeItemProvider } from "./context/HomeItemContext";

export default function Page() {
  return (
    <HomeItemProvider>
        <div className={"container py-10"}>
            <HomeClient />
        </div>
    </HomeItemProvider>
  );
}
