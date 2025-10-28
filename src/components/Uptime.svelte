<script lang="ts">
    import { onMount } from "svelte";
    import { getUptime } from "../service/api";

    let uptime = $state<string>("Carregando...");
    let startTime = $state<string>("");
    let status = $state<string>("checking");

    function formatElapsedTime(ms: number): string {
        if (ms < 0) return "Tempo futuro";
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    function formatStartTime(dateStr: string): string {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} às ${hours}:${minutes}`;
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

<div class="uptime-container">
    <h2>Status de Uptime</h2>
    <p class="status {status}">{uptime}</p>
    {#if startTime}
        <p>Início: {formatStartTime(startTime)}</p>
    {/if}
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
    }
    .checking {
        background-color: #fff3cd;
        color: #856404;
    }
    .up {
        background-color: #d4edda;
        color: #155724;
    }
    .down {
        background-color: #f8d7da;
        color: #721c24;
    }
    .error {
        background-color: #f8d7da;
        color: #721c24;
    }
    .unknown {
        background-color: #e2e3e5;
        color: #383d41;
    }
</style>
