export interface LoadProcessResponse {
  data: Process[];
}

export interface Process {
  id: string;
  name: string;
  status: string;
  system_time: string;
  mem: number;
  namespace: string;
  pid: number;
  restarts: number;
}
