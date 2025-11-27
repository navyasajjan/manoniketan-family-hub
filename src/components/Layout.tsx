import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import ChildProfileSelector from "./ChildProfileSelector";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="fixed top-4 right-4 z-40">
        <ChildProfileSelector />
      </div>
      <main className="pb-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
