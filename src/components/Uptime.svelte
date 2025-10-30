<script lang="ts">
  import { onMount } from "svelte";
  import { getUptime } from "../service/api";

  let uptime = $state<string>("Carregando...");
  let startTime = $state<string>("");
  let status = $state<string>("checking");

  function formatElapsedTime(ms: number): string {
    if (ms < 0) return "Tempo futuro";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  }

  onMount(async () => {
    try {
      const response = await getUptime();
      const startTimeStr = response.data || "";
      if (startTimeStr) {
        const startDate = new Date(startTimeStr);
        const currentTime = new Date();
        const elapsedMs = currentTime.getTime() - startDate.getTime();
        uptime = formatElapsedTime(elapsedMs);
        startTime = startTimeStr;
        status = "up";
      } else {
        uptime = "Dados indisponíveis";
        status = "unknown";
      }
    } catch (error) {
      uptime = "Erro ao carregar";
      status = "error";
    }
  });
</script>

<div>
  <div class="uptime-container">
    <p class="status {status}">{uptime}</p>
  </div>
</div>

<style>
  .uptime-container {
    text-align: center;
    padding: 20px;
  }
  .status {
    font-size: 1.2em;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
  }
  .checking {
    background-color: #fff3cd;
    color: #856404;
  }
  .up {
    background-color: var(--color-primary);
    color: var(--color-text-secondary);
  }
  .down {
    background-color: var(--color-primary-red);
  }
  .error {
    background-color: var(--color-card);
  }
  .unknown {
    background-color: var(--color-card);
  }
</style>
