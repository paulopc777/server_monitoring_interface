<script>
  import LineChart from "../components/charts/LineChart.svelte";
  import Cpu from "../components/Cpu.svelte";
  import Memory from "../components/Memory.svelte";
  import Uptime from "../components/Uptime.svelte";
</script>

<div class="px-8 py-4">
  <h1>Server TVBox</h1>
  <Cpu />

  <Memory />
  <Uptime />
  <LineChart />
</div>
