import { useState, useEffect, useCallback, useRef } from "react";
import { ApiEndpoint, ApiResponse, ApiParameter } from "@/types/api";
import { JsonEditor } from "./JsonEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Play, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import cloneDeep from "lodash/cloneDeep";
import axios, { AxiosRequestConfig } from "axios";
import { formatISO } from "date-fns";
import { ReferenceIdGenerator } from "@/utils/RefIdGen";
import { FaMinus, FaPlus } from "react-icons/fa";

interface ApiSandboxProps {
  api: ApiEndpoint;
}

export function ApiSandbox_1({ api }: ApiSandboxProps) {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [payload, setPayload] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("request");
  const [inputMode, setInputMode] = useState("form"); // "form" or "json"
  const { toast } = useToast();

  const [agentType, setAgentType] = useState("int");

  // Use refs to prevent circular updates
  const isUpdatingFromJson = useRef(false);
  const isUpdatingFromDevice = useRef(false);

  // Initialize parameters and payload on API change
  useEffect(() => {
    const defaultParams: Record<string, any> = {};

    // Initialize from defaultPayload for body parameters
    if (api.method === "POST" && api.defaultPayload) {
      Object.keys(api.defaultPayload).forEach((key) => {
        defaultParams[key] = cloneDeep(api.defaultPayload[key]);
      });
    }

    // Initialize other parameters
    api.parameters.forEach((param) => {
      if (!defaultParams.hasOwnProperty(param.name)) {
        defaultParams[param.name] =
          cloneDeep(param.defaultValue) || (param.type === "object" ? {} : "");
      }
    });

    setParameters(defaultParams);
    setPayload(JSON.stringify(api.defaultPayload || defaultParams, null, 2));
    setResponse(null);
    setActiveTab("request");
    setInputMode("form");
  }, [api]);

  // Sync form changes to JSON payload
  const syncFormToJson = useCallback(() => {
    if (isUpdatingFromJson.current || isUpdatingFromDevice.current) return;

    try {
      if (api.method === "POST") {
        const bodyParams = {};

        // Include all parameters that have values
        Object.keys(parameters).forEach((key) => {
          if (parameters[key] !== undefined && parameters[key] !== "") {
            bodyParams[key] = parameters[key];
          }
        });

        setPayload(JSON.stringify(bodyParams, null, 2));
      } else {
        // For GET requests, only include query parameters in JSON view
        const queryParams = {};
        api.parameters
          .filter((p) => p.in === "query")
          .forEach((p) => {
            if (parameters[p.name] !== undefined && parameters[p.name] !== "") {
              queryParams[p.name] = parameters[p.name];
            }
          });
        setPayload(JSON.stringify(queryParams, null, 2));
      }
    } catch (error) {
      console.error("Error syncing form to JSON:", error);
    }
  }, [parameters, api]);

  // Trigger form to JSON sync when parameters change
  useEffect(() => {
    const timer = setTimeout(() => {
      syncFormToJson();
    }, 0);
    return () => clearTimeout(timer);
  }, [parameters, syncFormToJson]);

  // Handle JSON changes and sync to form
  const handlePayloadChange = useCallback(
    (newPayload: string) => {
      setPayload(newPayload);

      // Use a timeout to avoid blocking the input
      const timer = setTimeout(() => {
        if (isUpdatingFromDevice.current) return;

        isUpdatingFromJson.current = true;
        try {
          const parsedPayload = JSON.parse(newPayload);

          if (api.method === "POST") {
            // For POST, completely replace parameters with JSON data
            setParameters(parsedPayload);
          } else {
            // For GET, only update query parameters
            const newParameters = { ...parameters };
            api.parameters.forEach((param) => {
              if (
                param.in === "query" &&
                parsedPayload.hasOwnProperty(param.name)
              ) {
                newParameters[param.name] = parsedPayload[param.name];
              }
            });
            setParameters(newParameters);
          }
        } catch (error) {
          // Invalid JSON, don't update parameters
          console.error("Invalid JSON:", error);
        } finally {
          isUpdatingFromJson.current = false;
        }
      }, 0);

      return () => clearTimeout(timer);
    },
    [api, parameters]
  );

  // Updated function to handle nested value updates
  const updateNestedValue = useCallback((path: string[], value: any) => {
    setParameters((prev) => {
      const updated = cloneDeep(prev);
      let target: any = updated;

      // Navigate to the parent of the target
      for (let i = 0; i < path.length - 1; i++) {
        if (!target[path[i]]) {
          target[path[i]] = {};
        }
        target = target[path[i]];
      }

      // Set the value
      target[path[path.length - 1]] = value;

      return updated;
    });
  }, []);

  // Get nested value from parameters
  const getNestedValue = useCallback(
    (path: string[]) => {
      let target = parameters;
      for (const key of path) {
        if (
          target &&
          typeof target === "object" &&
          target.hasOwnProperty(key)
        ) {
          target = target[key];
        } else {
          return undefined;
        }
      }
      return target;
    },
    [parameters]
  );

  // Handle agent type changes
  const handleAgentType = (newAgentType) => {
    const refId = "PLU" + ReferenceIdGenerator.generate().slice(3, 35);
    const timeStamp = formatISO(new Date());

    let deviceConfig = {};

    if (newAgentType === "int") {
      deviceConfig = {
        refId,
        timeStamp,
        agentId: "IF31IF03INT524833871",
        deviceDetails: {
          MAC: "04-D9-C8-64-5E-3F",
          IP: "122.160.88.102",
        },
      };
    } else if (newAgentType === "mob") {
      deviceConfig = {
        refId,
        timeStamp,
        agentId: "IF31IF03MOB521569135",
        deviceDetails: {
          APP: "Paytm",
          OS: "Android",
          IP: "122.15.121.179",
          IMEI: "332264829646596",
        },
      };
    } else if (newAgentType === "agt") {
      deviceConfig = {
        refId,
        timeStamp,
        agentId: "IF31IF03AGT515743404",
        deviceDetails: {
          TERMINAL_ID: "212122",
          MOBILE: "9120226043",
          GEOCODE: "12.9667,77.5667",
          POSTAL_CODE: "221303",
        },
      };
    }

    if (Object.keys(deviceConfig).length > 0) {
      // Update parameters directly with new values
      if (api.type === "fetch") {
        setParameters((prev) => ({
          ...prev,
          refId: deviceConfig.refId,
          timeStamp: deviceConfig.timeStamp,
          agentId: deviceConfig.agentId,
          deviceDetails: { ...deviceConfig.deviceDetails },
        }));
      }
      if (api.type === "payment") {
        setParameters((prev) => ({
          ...prev,
          refId: deviceConfig.refId,
          customerDetails: {
            EMAIL: "mishrashubh38@gmail.com",
            "Remitter Name": "Shubham Mishra",
          },
          txn: {
            ts: deviceConfig.timeStamp,
            paymentRefId: Math.random()
              .toString(36)
              .substring(2, 14)
              .toUpperCase(),
          },
          agentId: deviceConfig.agentId,
          deviceDetails: { ...deviceConfig.deviceDetails },
        }));
      }
      if (api.type === "validate") {
        setParameters((prev) => ({
          ...prev,
          refId: deviceConfig.refId,
          agentId: deviceConfig.agentId,
        }));
      }
    }

    setAgentType(newAgentType);
  };

  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const toggleExpand = (path: string) => {
    setExpandedPaths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) newSet.delete(path);
      else newSet.add(path);
      return newSet;
    });
  };

  // Fixed renderParameter function
  const renderParameter = (
    param: ApiParameter,
    value: any,
    path: string[] = []
  ): JSX.Element => {
    const fullPath = [...path, param.name];
    const pathKey = fullPath.join(".");
    const currentValue = getNestedValue(fullPath);

    if (param.type === "object") {
      const nestedValue = currentValue || {};
      const isExpanded = expandedPaths.has(pathKey);
      return (
        <div key={fullPath.join(".")} className="space-y-4 border-l pl-4">
          <Label
            className="font-semibold flex gap-5 cursor-pointer"
            onClick={() => toggleExpand(pathKey)}
          >
            {isExpanded ? <FaMinus /> : <FaPlus />}
            {param.name}
          </Label>
          {isExpanded && (
            <div>
              {Object.entries(nestedValue).map(([childKey, childValue]) =>
                renderParameter(
                  {
                    name: childKey,
                    type:
                      typeof childValue === "object" && childValue !== null
                        ? "object"
                        : typeof childValue === "string"
                        ? "string"
                        : typeof childValue === "number"
                        ? "number"
                        : typeof childValue === "boolean"
                        ? "boolean"
                        : "string",
                    required: true,
                    description: `${childKey} (nested under ${param.name})`,
                    defaultValue: childValue,
                    editable: true,
                    in: param.in,
                  },
                  childValue,
                  fullPath
                )
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={fullPath.join(".")} className="space-y-2">
        <div className="flex gap-5 items-center">
          <Label>
            {param.name}{" "}
            {param.required && <span className="text-destructive">*</span>}
            <Badge variant="outline" className="text-xs ml-2">
              {param.type}
            </Badge>
          </Label>
          <p className="text-xs text-muted-foreground">{param.description}</p>
        </div>
        <Input
          type={param.type === "number" ? "number" : "text"}
          value={currentValue ?? ""}
          onChange={(e) => {
            const newValue =
              param.type === "number" ? Number(e.target.value) : e.target.value;
            updateNestedValue(fullPath, newValue);
          }}
          placeholder={param.description}
          disabled={false} // Make all fields editable
        />
      </div>
    );
  };

  // Execute API request
  const executeRequest = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      let url = api.url;
      api.headers.Authorization = `Bearer ${localStorage.getItem(
        `access_token_${agentType?.toLowerCase()}`
      )}`;

      // Change the URL if it's a fetch or payment type
      if (["fetch", "payment"].includes(api.type)) {
        url = url.replace("${initiatingChannel}", agentType?.toLowerCase());
      }

      // Replace path params
      api.parameters
        .filter((p) => p.in === "path")
        .forEach((p) => {
          const val = parameters[p.name];
          if (val) {
            url = url + "/" + (parameters["billerId"] || p.defaultValue);
          }
        });

      // Add query params
      const searchParams = new URLSearchParams();
      api.parameters
        .filter((p) => p.in === "query")
        .forEach((p) => {
          const val = parameters[p.name];
          if (val !== undefined && val !== "") {
            searchParams.append(p.name, String(val));
          }
        });

      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }

      const requestOptions: RequestInit = {
        method: api.method,
        headers: api.headers || {},
      };

      // For POST requests, include the payload
      if (api.method === "POST") {
        let requestBody;

        try {
          // Always try to parse the current payload
          requestBody = JSON.parse(payload);
        } catch {
          toast({
            title: "Invalid JSON",
            description: "Please check your JSON payload for syntax errors.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        requestOptions.body = requestBody;
      }

      console.log("Request:", { url, options: requestOptions });

      let response;
      if (api.method === "GET") {
        response = await axios.get(url, {
          headers: requestOptions.headers,
        } as AxiosRequestConfig);
      } else {
        response = await axios.post(url, requestOptions.body, {
          headers: requestOptions.headers,
        } as AxiosRequestConfig);
      }

      const duration = Date.now() - startTime;
      const apiResponse: ApiResponse = {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        duration,
        timestamp: new Date().toISOString(),
      };

      setResponse(apiResponse);
      setActiveTab("response");

      toast({
        title: "Request successful",
        description: `${api.method} request completed in ${duration}ms`,
      });
    } catch (error: any) {
      const err = error?.response?.data;
      const errors = error?.response?.data?.payload?.errors || [];
      const duration = Date.now() - startTime;

      const apiResponse: ApiResponse = {
        status: error?.response?.status || 0,
        statusText: err?.message || "Network Error",
        data: err,
        duration,
        timestamp: new Date().toISOString(),
      };

      setResponse(apiResponse);
      setActiveTab("response");

      toast({
        title: err?.message || "Network error",
        description:
          typeof errors[0]?.reason === "object"
            ? errors[0]?.reason[Object.keys(errors[0]?.reason)[0]]
            : errors[0]?.reason || err?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status === 0) return "bg-red-500/10 text-red-700 dark:text-red-400";
    if (status >= 200 && status < 300)
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    if (status >= 400) return "bg-red-500/10 text-red-700 dark:text-red-400";
    return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "POST":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "PUT":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "DELETE":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>

        <TabsContent value="request" className="space-y-6">
          {/* Input Mode Selection */}
          <Card>
            <CardHeader>
              <div className="flex gap-10 items-center">
                <CardTitle className="text-lg">Input Mode</CardTitle>
                <form className="flex gap-2 items-center">
                  <CardTitle className="text-lg"> Select Agent Type</CardTitle>
                  <div>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        handleAgentType(e.target.value);
                      }}
                    >
                      <option value="int" selected>
                        Website (B2C)
                      </option>
                      <option value="mob">Mobile (B2C)</option>
                      <option value="agt">Agent (B2B)</option>
                    </select>
                  </div>
                </form>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={inputMode} onValueChange={setInputMode}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="form">Form</TabsTrigger>
                  {api.method !== "GET" && (
                    <TabsTrigger value="json">JSON</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="form" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {api.method === "GET"
                          ? "Query Parameters"
                          : "Request Parameters"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {api.method === "POST"
                        ? // For POST, show all parameters from current state
                          Object.keys(parameters).map((key) => {
                            const param = api.parameters.find(
                              (p) => p.name === key
                            ) || {
                              name: key,
                              type:
                                typeof parameters[key] === "object" &&
                                parameters[key] !== null
                                  ? "object"
                                  : typeof parameters[key] === "string"
                                  ? "string"
                                  : typeof parameters[key] === "number"
                                  ? "number"
                                  : typeof parameters[key] === "boolean"
                                  ? "boolean"
                                  : "string",
                              required: true,
                              description: key,
                              defaultValue: parameters[key],
                              editable: true,
                              in: "body",
                            };

                            return renderParameter(param, parameters[key]);
                          })
                        : // For GET, show only defined parameters
                          api.parameters.map((param) =>
                            renderParameter(param, parameters[param.name])
                          )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="json" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {api.method === "GET"
                          ? "Query Parameters (JSON)"
                          : "Request Body (JSON)"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <JsonEditor
                        value={payload}
                        onChange={handlePayloadChange}
                        placeholder={`Enter ${
                          api.method === "GET"
                            ? "query parameters"
                            : "request body"
                        } as JSON...`}
                        readonly={false}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

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
              {loading ? "Executing..." : "Execute Request"}
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
                  <div className="bg-muted/50 rounded p-4 font-mono text-sm overflow-auto max-h-[500px]">
                    <pre>{JSON.stringify(response?.data, null, 2)}</pre>
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
