<script>
  import LineChart from "../components/charts/LineChart.svelte";
  import Cpu from "../components/Cpu.svelte";
  import Memory from "../components/Memory.svelte";
  import Uptime from "../components/Uptime.svelte";
</script>

<div class="px-8 py-4">
  <Uptime />
  <div class="flex gap-2">
    <div class="w-1/2">
      <Cpu />
    </div>
    <div class="w-1/2">
      <Memory />
    </div>
  </div>
  <div class="my-4">
    <LineChart />
  </div>
</div>
