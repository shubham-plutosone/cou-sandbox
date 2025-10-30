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
      <div className="flex flex-col w-full bg-background">

        {/* Main Layout */}
        <div className="flex-1 flex flex-col">
          <ApiTopbar
            selectedApi={selectedApi} 
            onSelectApi={setSelectedApi} 
          />
          
          <main className="flex-1 overflow-auto">
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