import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { Providers } from "@/components/shared/Providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex h-screen overflow-hidden bg-navy-900">
        {/* Sidebar — desktop only */}
        <DashboardSidebar />

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
