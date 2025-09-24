export interface ApiParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object';
  required: boolean;
  description: string;
  defaultValue?: any;
  in?: 'query' | 'path' | 'body' | 'header';
}

export interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  type?: 'fetch' | 'payment' | 'other';
  parameters: ApiParameter[];
  defaultPayload: Record<string, any>;
  headers?: Record<string, string>;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  data: any;
  duration: number;
  timestamp: string;
}
