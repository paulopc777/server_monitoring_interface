<script lang="ts">
  import { onMount } from "svelte";
  import BlockStatus from "../components/charts/BlockStatus.svelte";
  import LineChart from "../components/charts/LineChart.svelte";
  import Cpu from "../components/Cpu.svelte";
  import Memory from "../components/Memory.svelte";
  import Uptime from "../components/Uptime.svelte";
  import { getCpus } from "../service/api";
  import { getCpuHistory } from "../service/api";

  let cpus = $state<{
    total_cpus: number;
    total_cpu_usage: number;
    cores_usage: number[];
  }>({
    total_cpus: 0,
    total_cpu_usage: 0,
    cores_usage: [],
  });

  let usedCpu = $state(0);
  let cpuData = $state<
    | {
        id: number;
        total_cpus: number;
        total_cpu_usage: number;
        cores_usage: number[];
        created_at: string;
      }[]
    | null
  >(null);

  const getCpuData = async () => {
    try {
      const data = await getCpus();
      console.log(Math.round(data.total_cpu_usage / 10));
      usedCpu = Math.round(data.total_cpu_usage / 10);
      cpus = data;
      handleAddCpuData(data);
    } catch (error) {
      console.error("Error fetching CPU data:", error);
    }
  };

  const handleAddCpuData = (data: {
    total_cpus: number;
    total_cpu_usage: number;
    cores_usage: number[];
  }) => {
    let date = new Date();
    date.setHours(date.getHours() + 3);

    const newEntry = {
      id:
        cpuData && cpuData.length > 0 ? cpuData[cpuData.length - 1].id + 1 : 1,
      total_cpus: data.total_cpus,
      total_cpu_usage: data.total_cpu_usage,
      cores_usage: data.cores_usage,
      created_at: date.toISOString(),
    };
    cpuData = cpuData ? [newEntry, ...cpuData.slice(0, 29)] : [newEntry];
  };

  const fetchCpuHistory = () => {
    getCpuHistory().then((data) => {
      cpuData = data;
    });
  };

  $effect(() => {
    console.log(cpuData);
  });

  onMount(() => {
    getCpuData();
    fetchCpuHistory();
    setInterval(getCpuData, 10000);
  });
</script>

<div class="px-8 py-4">
  <Uptime />
  <div class="flex gap-2">
    <div class="w-1/2">
      <Cpu {cpus} {usedCpu} />
    </div>
    <div class="w-1/2">
      <Memory />
    </div>
  </div>
  <div>
    <BlockStatus />
  </div>
  <div class="my-4">
    <LineChart {cpuData} />
  </div>
</div>
