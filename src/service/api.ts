import axios from "axios";
const url = "http://127.0.0.1:3000";

const getCpus = async () => {
  const response = await axios.get(`${url}/cpu`);
  return response.data as {
    total_cpus: number;
    total_cpu_usage: number;
    cores_usage: number[];
  };
};

const getMemory = async () => {
  const response = await axios.get(`${url}/memory`);
  return response.data as {
    total_memory: number;
    used_memory: number;
    free_memory: number;
  };
};

const getUptime = async () => {
  const response = await axios.get(`${url}/uptime`);
  return response.data as any;
};

const getCpuHistory = async () => {
  const response = await axios.get(`${url}/cpu/history`);
  return response.data.data as {
    id: number;
    total_cpus: number;
    total_cpu_usage: number;
    cores_usage: number[];
    created_at: string;
  }[];
};

const getUrlStatus = async () => {
  const response = await axios.get(`${url}/urls`);
  return response.data.data as {
    id: number;
    url: string;
    status_code: string;
    created_at: string;
  }[];
};

const deleteUrlStatus = async (id: number) => {
  const response = await axios.delete(`${url}/urls`, { data: { id: id } });
  return response.data;
};

const createUrlStatus = async (urlToCheck: string) => {
  const response = await axios.post(`${url}/urls`, { url: urlToCheck });
  return response.data;
};

export {
  getCpus,
  getMemory,
  getUptime,
  getCpuHistory,
  getUrlStatus,
  deleteUrlStatus,
  createUrlStatus,
};
