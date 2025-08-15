import { ReactNode } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { LMSSidebar } from "./LMSSidebar";
import { LMSHeader } from "./LMSHeader";

interface LMSLayoutProps {
  children: ReactNode;
}

const LMSLayout = ({ children }: LMSLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <LMSSidebar />
        <div className="flex-1 flex flex-col">
          <LMSHeader />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LMSLayout;