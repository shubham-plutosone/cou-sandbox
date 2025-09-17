import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { APIs } from '@/data/apis';
import { ApiEndpoint } from '@/types/api';
import { Badge } from '@/components/ui/badge';

interface ApiSidebarProps {
  selectedApi: ApiEndpoint | null;
  onSelectApi: (api: ApiEndpoint) => void;
}

export function ApiSidebar({ selectedApi, onSelectApi }: ApiSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'POST': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'PUT': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'DELETE': return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-80'} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            {!isCollapsed && 'API ENDPOINTS'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {APIs.map((api) => (
                <SidebarMenuItem key={api.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectApi(api)}
                    isActive={selectedApi?.id === api.id}
                    className="flex items-start p-3 h-auto"
                  >
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      {!isCollapsed && (
                        <>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs font-mono ${getMethodColor(api.method)}`}
                            >
                              {api.method}
                            </Badge>
                            <span className="font-medium text-sm truncate">
                              {api.name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {api.description}
                          </p>
                        </>
                      )}
                      
                      {isCollapsed && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs font-mono ${getMethodColor(api.method)}`}
                        >
                          {api.method}
                        </Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}