<script lang="ts">
  import Card from "./ui/Card.svelte";
  import VelocimeterChart from "./charts/VelocimeterChart.svelte";
  import BlocksChart from "./charts/BlocksChart.svelte";

  const {
    cpus,
    usedCpu,
  }: {
    cpus: {
      total_cpus: number;
      total_cpu_usage: number;
      cores_usage: number[];
    };
    usedCpu: number;
  } = $props();
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
