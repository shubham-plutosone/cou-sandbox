import { APIs } from '@/data/apis';
import { ApiEndpoint } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Code } from 'lucide-react';

interface ApiTopbarProps {
  selectedApi: ApiEndpoint | null;
  onSelectApi: (api: ApiEndpoint) => void;
}

export function ApiTopbar({ selectedApi, onSelectApi }: ApiTopbarProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'POST':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'PUT':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'DELETE':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-center gap-4 px-6 py-3 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      {/* Icon & Label */}
      <div className="flex items-center gap-2 text-primary font-medium">
        <Code className="h-5 w-5" />
        <span className="text-sm">API Endpoint</span>
      </div>

      {/* Highlighted Select Dropdown */}
      <Select
        value={selectedApi?.id || ''}
        onValueChange={(value) => {
          const api = APIs.find((a) => a.id === value);
          if (api) onSelectApi(api);
        }}
      >
        <SelectTrigger
          className="
            w-[360px] 
            border-2 border-primary/50 
            rounded-lg 
            bg-background 
            hover:border-primary 
            focus:ring-2 
            focus:ring-primary 
            transition 
            shadow-sm
          "
        >
          <SelectValue placeholder="Select an API" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {APIs.map((api) => (
            <SelectItem key={api.id} value={api.id}>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0.5 font-mono ${getMethodColor(
                    api.method
                  )}`}
                >
                  {api.method}
                </Badge>
                {/* Full API Name */}
                <span className="text-sm font-medium">{api.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Method Badge (selected) */}
      {selectedApi && (
        <Badge
          className={`text-xs px-2 py-0.5 font-mono ${getMethodColor(
            selectedApi.method
          )}`}
        >
          {selectedApi.method}
        </Badge>
      )}
    </div>
  );
}
