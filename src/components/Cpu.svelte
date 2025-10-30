<script lang="ts">
  import { onMount } from "svelte";
  import { getCpus } from "../service/api";
  import Card from "./ui/Card.svelte";
  import VelocimeterChart from "./charts/VelocimeterChart.svelte";
  import BlocksChart from "./charts/BlocksChart.svelte";

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

  const getCpuData = async () => {
    try {
      const data = await getCpus();

      console.log(Math.round(data.total_cpu_usage / 10));
      usedCpu = Math.round(data.total_cpu_usage / 10);
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
  <Card className="">
    <div class="flex justify-between">
      <div>
        <p class="text-text-secondary">
          <small> Threads: </small>
        </p>
        <p>Total CPUs: {cpus.total_cpus}</p>
        <div class="my-2">
          <BlocksChart
            items={Object.entries(cpus.cores_usage).map(([index, value]) => ({
              label: `Core ${+index + 1}`,
              value,
            }))}
          />
        </div>
      </div>
      <VelocimeterChart
        rotate={-3.5}
        label={`${cpus.total_cpu_usage}%`}
        total={10}
        used={usedCpu}
      />
    </div>
  </Card>
</div>
