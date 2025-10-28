<script lang="ts">
  import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from "chart.js";
  import { onMount } from "svelte";
  import { getCpuHistory } from "../../service/api";
  // Registrar os componentes do Chart.js
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  let canvas: HTMLCanvasElement | null = null;
  let chart: Chart | null = null;
  let cpuData:
    | {
        id: number;
        total_cpus: number;
        total_cpu_usage: number;
        cores_usage: number[];
        created_at: string;
      }[]
    | null = $state(null);

  const fetchCpuHistory = () => {
    getCpuHistory().then((data) => {
      cpuData = data;
    });
  };

  const makeDate = () => {
    return cpuData
      ? cpuData
          .map((data) => {
            const date = new Date(data.created_at); // data de criação
            let hours = (date.getHours() - 3).toString().padStart(2, "0");
            let minutes = date.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
          })
          .reverse()
      : ["Unknown"];
  };

  const makeCpuData = () => {
    return cpuData
      ? cpuData.map((data) => data.total_cpu_usage).reverse()
      : [0];
  };

  onMount(() => {
    fetchCpuHistory();
    if (canvas) {
      chart = new Chart(canvas, {
        type: "line",
        data: {
          labels: makeDate(), // X-axis labels
          datasets: [
            {
              label: "CPU Usage",
              data: makeCpuData(), // Y-axis data
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 0,
              pointRadius: 0,
              fill: true,
              tension: 0.4,
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return context.parsed.y + "%";
                  },
                },
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      // Cleanup: destruir o chart quando o componente for desmontado
      if (chart) {
        chart.destroy();
      }
    };
  });

  $effect(() => {
    if (!chart) {
      return;
    }
    chart.data = {
      labels: makeDate(), // X-axis labels
      datasets: [
        {
          label: "CPU Usage",
          data: makeCpuData(), // Y-axis data
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 0,
          pointRadius: 3,
          fill: true,
          tension: 0,
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.parsed.y + "%";
              },
            },
          },
        },
      ],
    };
    chart.update();
  });
</script>

<div class="w-full h-96 bg-white rounded-lg shadow-lg p-4">
  <canvas id="cpuChart" bind:this={canvas} style="width: 100%; height: 100%;"
  ></canvas>
</div>

<style>
</style>
