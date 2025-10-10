import { useState, useEffect } from "react";
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

interface ApiSandboxProps {
  api: ApiEndpoint;
}

export function ApiSandbox({ api }: ApiSandboxProps) {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [payload, setPayload] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("request");
  const { toast } = useToast();

  const [deviceDetailsState, setDeviceDetailsState] = useState({});

  useEffect(() => {
    setDeviceDetailsState({
      refId: "PLU" + ReferenceIdGenerator.generate().slice(3, 35),
      timeStamp: formatISO(new Date()),
      deviceType: "INT",
      agentId: api.defaultPayload.agentId || "IF31IF03INT524833871",
      deviceDetails: {
        MAC: "04-D9-C8-64-5E-3F",
        IP: "122.160.88.102",
      },
    });
  }, [api]);

  // Chnage Parameters and Payload on API change
  useEffect(() => {
    const defaultParams: Record<string, any> = {};
    api.parameters.forEach((param) => {
      defaultParams[param.name] =
        cloneDeep(param.defaultValue) || (param.type === "object" ? {} : "");
    });
    setParameters(defaultParams);
    setPayload(JSON.stringify(api.defaultPayload, null, 2));
    setResponse(null);
    setActiveTab("request");
  }, [api]);

  // On Change in Initating Channel, Change the Payload on form & JSON both
  useEffect(() => {
    const parsed = JSON.parse(payload || "{}");
    const { refId, timeStamp, deviceDetails, agentId, ...rest } = parsed;
    const newPayload = {
      refId: deviceDetailsState.refId,
      timeStamp: deviceDetailsState.timeStamp,
      agentId: deviceDetailsState.agentId,
      deviceDetails: deviceDetailsState.deviceDetails,
      ...rest,
    };
    // Set JSON Payload
    setPayload(JSON.stringify(newPayload, null, 2));

    // Set Form Payload
    setParameters((prev) => {
      return {
        ...prev,
        refId: deviceDetailsState.refId,
        timeStamp: deviceDetailsState.timeStamp,
        agentId: deviceDetailsState.agentId,
      };
    });
  }, [
    deviceDetailsState.refId,
    deviceDetailsState.timeStamp,
    deviceDetailsState.deviceType,
    deviceDetailsState.deviceDetails,
    deviceDetailsState.agentId,
    payload,
  ]);

  const updateNestedValue = (path: string[], value: any) => {
    setParameters((prev) => {
      const updated = cloneDeep(prev);
      let target: any = updated;
      for (let i = 0; i < path.length - 1; i++) {
        target[path[i]] = target[path[i]] || {};
        target = target[path[i]];
      }
      target[path[path.length - 1]] = value;
      return updated;
    });

    // Update payload if the changed parameter is part deviceDetails
    if (path[0] === "deviceDetails") {
      const refId = "PLU" + ReferenceIdGenerator.generate().slice(3, 35);
      const timeStamp = formatISO(new Date());
      if (["int", "INT"].includes(value)) {
        setDeviceDetailsState({
          refId,
          timeStamp,
          deviceType: "INT",
          agentId: "IF31IF03INT524833871",
          deviceDetails: {
            MAC: "04-D9-C8-64-5E-3F",
            IP: "122.160.88.102",
          },
        });
      }
      if (["mob", "MOB"].includes(value)) {
        setDeviceDetailsState({
          refId,
          timeStamp,
          deviceType: "MOB",
          agentId: "IF31IF03MOB521569135",
          deviceDetails: {
            APP: "Paytm",
            OS: "Android",
            IP: "122.15.121.179",
            IMEI: "332264829646596",
          },
        });
      }
      if (["agt", "AGT"].includes(value)) {
        setDeviceDetailsState({
          refId,
          timeStamp,
          deviceType: "AGT",
          agentId: "IF31IF03AGT515743404",
          deviceDetails: {
            TERMINAL_ID: "212122",
            MOBILE: "9120226043",
            GEOCODE: "12.9667,77.5667",
            POSTAL_CODE: "221303",
          },
        });
      }
    }
  };

  const renderParameter = (
    param: ApiParameter,
    value: any,
    path: string[] = []
  ): JSX.Element => {
    const fullPath = [...path, param.name];

    if (param.type === "object" && param.defaultValue) {
      return (
        <div key={fullPath.join(".")} className="space-y-4 border-l pl-4">
          <Label className="font-semibold">{param.name}</Label>
          {Object.entries(param.defaultValue).map(([childKey, childValue]) =>
            renderParameter(
              {
                name: childKey,
                type:
                  typeof childValue === "object"
                    ? "object"
                    : (typeof childValue as any),
                required: false,
                description: `${childKey} (nested under ${param.name})`,
                defaultValue: childValue,
                editable: true,
              },
              value?.[childKey],
              fullPath
            )
          )}
        </div>
      );
    }

    return (
      <div key={fullPath.join(".")} className="space-y-2">
        <Label>
          {param.name}{" "}
          {param.required && <span className="text-destructive">*</span>}
          <Badge variant="outline" className="text-xs ml-2">
            {param.type}
          </Badge>
        </Label>
        <Input
          type={param.type === "number" ? "number" : "text"}
          value={value ?? ""}
          onChange={(e) =>
            updateNestedValue(
              fullPath,
              param.type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          placeholder={param.description}
          disabled={!param.editable}
        />
        <p className="text-xs text-muted-foreground">{param.description}</p>
      </div>
    );
  };

  const executeRequest = async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      let url = api.url;
      api.headers.Authorization = `Bearer ${localStorage.getItem(
        `access_token_${deviceDetailsState?.deviceType?.toLowerCase()}`
      )}`;

      // Change the URL if it's a fetch or payment type
      if (["fetch", "payment"].includes(api.type)) {
        url = url.replace(
          "${initiatingChannel}",
          deviceDetailsState?.deviceType?.toLowerCase()
        );
      }

      // Replace path params
      api.parameters
        .filter((p) => p.in === "path")
        .forEach((p) => {
          const val = parameters[p.name];
          if (val) {
            url = url + "/" + parameters["billerId"] || p.defaultValue;
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

      // For non-GET requests, include the payload
      if (api.method !== "GET" && payload.trim()) {
        try {
          requestOptions.body = JSON.parse(payload);
        } catch {
          toast({
            title: "Invalid JSON",
            description: "Please check your JSON payload for syntax errors.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      console.log(requestOptions);
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
      console.log(response);
      const duration = Date.now() - startTime;

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = (await response?.data) || {};
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
      // setActiveTab("response"); // Commented to avoid auto switch to response tab

      if (apiResponse.status === 200) {
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
      const err = error?.response?.data;
      const errors = error?.response?.data?.payload?.errors || [];
      console.log(errors, errors[0]?.reason, typeof errors[0]?.reason);
      const duration = Date.now() - startTime;
      const apiResponse: ApiResponse = {
        status: err?.code || 0,
        statusText: err?.message || "Network Error",
        data: err,
        duration,
        timestamp: new Date().toISOString(),
      };
      setResponse(apiResponse);
      // setActiveTab("response"); // Commented to avoid auto switch to response tab
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          {/* <TabsTrigger value="response">Response</TabsTrigger> */}
        </TabsList>

        <div className="flex gap-5">
          <div className="w-full">
            <TabsContent value="request" className="space-y-6">
              {api.parameters.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {api.method === "GET"
                        ? "Query Parameters"
                        : "Request Body"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {api.parameters.map((param) =>
                      renderParameter(param, parameters[param.name])
                    )}
                  </CardContent>
                </Card>
              )}

              {api.method !== "GET" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Request Body</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <JsonEditor
                      value={payload}
                      onChange={setPayload}
                      placeholder="Enter JSON payload..."
                      readonly={true}
                    />
                  </CardContent>
                </Card>
              )}

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
          </div>
          <div className="w-full">
            {/* Display the response */}
            <TabsContent value="request">
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
          </div>
        </div>
      </Tabs>
    </div>
  );
}
