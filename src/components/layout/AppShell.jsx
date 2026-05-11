"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function AppShell({ children }) {
  const pathname = usePathname() ?? "";
  const hideStudentChrome =
    pathname.startsWith("/admin") || pathname.startsWith("/auth");
  const showStudentSidebar = !hideStudentChrome;

  return (
    <>
      <Header />
      {showStudentSidebar ? <DashboardSidebar /> : null}
      <main
        className={
          showStudentSidebar ? "flex-1 lg:pl-[312px]" : "flex-1"
        }
      >
        {children}
      </main>
      <Footer inset={showStudentSidebar} />
    </>
  );
}
