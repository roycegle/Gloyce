import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { DashboardBottomNav } from "@/components/layout/DashboardBottomNav";
import { Providers } from "@/components/shared/Providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex h-screen overflow-hidden bg-navy-900">
        {/* Desktop sidebar — hidden on mobile */}
        <DashboardSidebar />

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <DashboardTopbar />
          {/* Extra bottom padding on mobile for the tab bar */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
            {children}
          </main>
        </div>
      </div>

      {/* Bottom tab bar — mobile only */}
      <DashboardBottomNav />
    </Providers>
  );
}
