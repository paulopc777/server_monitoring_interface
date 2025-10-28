<script lang="ts">
  import { onMount } from "svelte";
  import { getCpus } from "../service/api";
  import ProgressCircle from "./ui/ProgressCircle.svelte";

  let cpus = $state<{
    total_cpus: number;
    total_cpu_usage: number;
    cores_usage: number[];
  }>({
    total_cpus: 0,
    total_cpu_usage: 0,
    cores_usage: [],
  });

  const getCpuData = async () => {
    try {
      const data = await getCpus();
      cpus = data;
    } catch (error) {
      console.error("Error fetching CPU data:", error);
    }
  };

  onMount(() => {
    getCpuData();
    setInterval(getCpuData, 10000);
  });
</script>

<div>
  <div class="flex flex-row gap-4 items-center justify-center">
    <div>
      <h2>CPU Usage</h2>
      <p>Total CPUs: {cpus.total_cpus}</p>
    </div>
    <ProgressCircle
      value={cpus.total_cpu_usage}
      size={150}
      strokeWidth={10}
      color="#10b981"
      textColor="#111827"
    />
  </div>
  <div class="mt-4 flex flex-row gap-4 flex-wrap justify-between">
    {#each cpus.cores_usage as usage, index}
      <div>
        <p>
          Core {index + 1}:
        </p>
        <ProgressCircle
          value={usage}
          size={50}
          strokeWidth={3}
          color="#10b981"
          textColor="#111827"
        />
      </div>
    {/each}
  </div>
</div>
