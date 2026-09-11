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
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <DashboardTopbar />
          {/* Bottom padding for the fixed bottom nav */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20">
            {children}
          </main>
        </div>
      </div>

      {/* Bottom nav — all screen sizes */}
      <DashboardBottomNav />
    </Providers>
  );
}
