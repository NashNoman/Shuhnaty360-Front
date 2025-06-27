import React from "react";
import { ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";
import AppSidebar from "./components/AppSidebar";
import Header from "./components/header/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarMobileToggle from "./components/SidebarMobileToggle";
import { SidebarProvider } from "./components/ui/sidebar";

const Layout = React.memo(() => {
  return (
    <SidebarProvider>
      {/* <div className="flex h-screen"> */}
      <AppSidebar />
      <main className="w-full max-w-full relative overflow-hidden">
        {/* <div className="relative overflow-y-auto"> */}
        {/* <SidebarTrigger className="md:hidden fixed top-4 right-4 z-50" /> */}
        <SidebarMobileToggle />
        <Header />
        <ScrollRestoration
          getKey={(location) => {
            return location.key;
          }}
        />
        <Toaster position="bottom-left" />
        <div className="max-w-full md:p-4">
          <ProtectedRoute />
        </div>
        {/* </div> */}
      </main>
      {/* </div> */}
    </SidebarProvider>
  );
});

export default Layout;
