/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
        className={`flex flex-col grow overflow-y-auto ${
          isSidebarOpen
            ? "lg:w-[calc(100vw-278px)]"
            : "lg:w-[calc(100vw-104px)]"
        }`}
      >
        <Header />
        <Toaster
          position="bottom-left"
          // toastOptions={{
          //   style: {
          //     textAlign: "center",
          //     justifyContent: "center",
          //   },
          // }}
        />
        <div className="grow md:p-4">{children}</div>
      </div>
    </div>
  );
});

export default Layout;
