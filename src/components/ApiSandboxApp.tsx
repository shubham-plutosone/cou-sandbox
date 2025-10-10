import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ApiSidebar } from './ApiSidebar';
import { APIs } from '@/data/apis';
import { ApiEndpoint } from '@/types/api';
import { Card } from '@/components/ui/card';
import { Code, Zap } from 'lucide-react';
import { ApiTopbar } from './ApiTopbar';
import { ApiSandbox_1 } from './ApiSandbox_1';

export function ApiSandboxApp() {
  const [selectedApi, setSelectedApi] = useState<ApiEndpoint | null>(APIs[0]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 h-14 bg-background border-b flex items-center px-4 z-50">
          {/* <SidebarTrigger className="mr-4" /> */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-primary">
              <Zap className="h-6 w-6" />
              <Code className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">BBPS COU API Sandbox</h1>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            Test and explore API endpoints
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col w-full pt-14">
          <ApiTopbar
            selectedApi={selectedApi} 
            onSelectApi={setSelectedApi} 
          />
          
          <main className="flex-1 min-h-screen">
            {selectedApi ? (
              <ApiSandbox_1 api={selectedApi} />
            ) : (
              <div className="flex items-center justify-center h-full p-6">
                <Card className="p-8 text-center max-w-md">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Code className="h-8 w-8" />
                      <Zap className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-semibold">Welcome to API Sandbox</h2>
                    <p className="text-muted-foreground">
                      Select an API endpoint from the sidebar to start testing. 
                      You can modify parameters, edit JSON payloads, and see real-time responses.
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}