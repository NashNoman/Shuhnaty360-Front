import React from "react";
import { ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { useSidebar } from "./context/SidebarContext";

const Layout = React.memo(({ children }: any) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className={`flex relative flex-col grow overflow-y-auto ${
          isSidebarOpen
            ? "lg:w-[calc(100vw-278px)]"
            : "lg:w-[calc(100vw-104px)]"
        }`}
      >
        <Header />
        <ScrollRestoration
          getKey={(location) => {
            return location.key;
          }}
        />
        <Toaster position="bottom-left" />
        <div className="grow md:p-4">{children}</div>
      </div>
    </div>
  );
});

export default Layout;
