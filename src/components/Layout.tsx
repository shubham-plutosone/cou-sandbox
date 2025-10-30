import { useState } from "react";
import { ApiSandboxApp } from "./ApiSandboxApp";
import { DocSidebar } from "./DocSidebar";
import { DocContent } from "./DocContent";
import { SidebarProvider } from "./ui/sidebar";
import { Code, Zap } from "lucide-react";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<"doc" | "app">("doc");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="h-14 bg-white border-b flex items-center px-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Zap className="h-6 w-6" />
            <Code className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold">BBPS COU API Sandbox</h1>
        </div>
        <div className="ml-auto text-sm text-gray-600">
          Test and explore API endpoints
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-4 py-3 flex gap-4 sticky top-14 z-40 border-b border-gray-700">
        <button
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === "doc"
              ? "bg-gray-700 underline font-semibold"
              : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("doc")}
        >
          Documentation
        </button>
        <button
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === "app"
              ? "bg-gray-700 underline font-semibold"
              : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("app")}
        >
          Workspace
        </button>
      </nav>

      {/* Content */}
      <main className="flex-1" style={{ height: 'calc(100vh - 7.5rem)' }}>
        {activeTab === "doc" && (
          <SidebarProvider>
            <div className="flex h-full w-full">
              {/* Sidebar */}
              <div className="w-60 border-r bg-gray-70 flex-shrink-0 fixed top-[7.5rem] bottom-0">
                <DocSidebar />
              </div>

              {/* Scrollable content */}
              <div className="flex-1 ml-64 overflow-y-auto p-5">
                <div className="container mx-auto px-8 py-12">
                  <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
                    <p className="text-lg text-gray-600">
                      Complete reference guide for the Biller API integration
                    </p>
                  </div>

                  <DocContent />
                </div>
              </div>
            </div>
          </SidebarProvider>
        )}
        {activeTab === "app" && (
          <div className="p-4 h-full overflow-auto">
            <ApiSandboxApp />
          </div>
        )}
      </main>
    </div>
  );
};