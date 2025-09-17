import { useState, useEffect } from 'react';
import { ApiEndpoint, ApiResponse } from '@/types/api';
import { JsonEditor } from './JsonEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Play, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiSandboxProps {
  api: ApiEndpoint;
}

export function ApiSandbox({ api }: ApiSandboxProps) {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [payload, setPayload] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('request');
  const { toast } = useToast();

  useEffect(() => {
    // Initialize parameters with default values
    const defaultParams: Record<string, any> = {};
    api.parameters.forEach(param => {
      defaultParams[param.name] = param.defaultValue || '';
    });
    setParameters(defaultParams);
    setPayload(JSON.stringify(api.defaultPayload, null, 2));
    setResponse(null);
    setActiveTab('request');
  }, [api]);

  const handleParameterChange = (name: string, value: any) => {
    setParameters(prev => ({ ...prev, [name]: value }));
  };

  const executeRequest = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      let url = api.url;
      
      // For GET requests, append query parameters
      if (api.method === 'GET' && Object.keys(parameters).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(parameters).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            searchParams.append(key, String(value));
          }
        });
        if (searchParams.toString()) {
          url += `?${searchParams.toString()}`;
        }
      }

      const requestOptions: RequestInit = {
        method: api.method,
        headers: api.headers || {},
      };

      // For non-GET requests, include the payload
      if (api.method !== 'GET' && payload.trim()) {
        try {
          JSON.parse(payload); // Validate JSON
          requestOptions.body = payload;
        } catch (err) {
          toast({
            title: "Invalid JSON",
            description: "Please check your JSON payload for syntax errors.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      const response = await fetch(url, requestOptions);
      const duration = Date.now() - startTime;
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      const apiResponse: ApiResponse = {
        status: response.status,
        statusText: response.statusText,
        data,
        duration,
        timestamp: new Date().toISOString(),
      };

      setResponse(apiResponse);
      setActiveTab('response');

      if (response.ok) {
        toast({
          title: "Request successful",
          description: `${api.method} request completed in ${duration}ms`,
        });
      } else {
        toast({
          title: "Request failed",
          description: `${response.status} ${response.statusText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      const apiResponse: ApiResponse = {
        status: 0,
        statusText: 'Network Error',
        data: { error: (error as Error).message },
        duration,
        timestamp: new Date().toISOString(),
      };
      setResponse(apiResponse);
      setActiveTab('response');

      toast({
        title: "Network error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status === 0) return 'bg-red-500/10 text-red-700 dark:text-red-400';
    if (status >= 200 && status < 300) return 'bg-green-500/10 text-green-700 dark:text-green-400';
    if (status >= 400) return 'bg-red-500/10 text-red-700 dark:text-red-400';
    return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
  };

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
    <div className="flex-1 p-6 space-y-6">
      {/* API Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge className={`font-mono ${getMethodColor(api.method)}`}>
              {api.method}
            </Badge>
            <CardTitle className="text-xl">{api.name}</CardTitle>
          </div>
          <p className="text-muted-foreground">{api.description}</p>
          <div className="text-sm font-mono bg-muted/50 p-2 rounded border">
            {api.url}
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>

        <TabsContent value="request" className="space-y-6">
          {/* Parameters */}
          {api.parameters.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {api.parameters.map((param) => (
                  <div key={param.name} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      {param.name}
                      {param.required && <span className="text-destructive">*</span>}
                      <Badge variant="outline" className="text-xs">
                        {param.type}
                      </Badge>
                    </Label>
                    <Input
                      type={param.type === 'number' ? 'number' : 'text'}
                      value={parameters[param.name] || ''}
                      onChange={(e) => handleParameterChange(param.name, 
                        param.type === 'number' ? Number(e.target.value) : e.target.value
                      )}
                      placeholder={param.description}
                    />
                    <p className="text-xs text-muted-foreground">{param.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* JSON Payload */}
          {api.method !== 'GET' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Request Body</CardTitle>
              </CardHeader>
              <CardContent>
                <JsonEditor
                  value={payload}
                  onChange={setPayload}
                  placeholder="Enter JSON payload..."
                />
              </CardContent>
            </Card>
          )}

          {/* Execute Button */}
          <div className="flex justify-center">
            <Button 
              onClick={executeRequest} 
              disabled={loading}
              size="lg"
              className="gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {loading ? 'Executing...' : 'Execute Request'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="response">
          {response ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    Response
                    {response.status === 0 ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : response.status >= 200 && response.status < 300 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {response.duration}ms
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(response.status)}>
                    {response.status} {response.statusText}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(response.timestamp).toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label>Response Body</Label>
                  <div className="bg-muted/50 rounded p-4 font-mono text-sm overflow-auto max-h-96">
                    <pre>{JSON.stringify(response.data, null, 2)}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Execute a request to see the response</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}