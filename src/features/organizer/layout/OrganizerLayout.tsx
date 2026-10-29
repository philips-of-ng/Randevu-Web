import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { OrganizerSidebar } from "./OrganizerSidebar";
import { OrganizerHeader } from "./OrganizerHeader";

export const OrganizerLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-neutral-100">
      {/* Sidebar with Desktop Collapse + Mobile Drawer */}
      <OrganizerSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <OrganizerHeader onOpenMobileSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizerLayout;