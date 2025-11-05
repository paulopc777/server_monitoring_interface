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

  let {
    cpuData,
  }: {
    cpuData:
      | {
          id: number;
          total_cpus: number;
          total_cpu_usage: number;
          cores_usage: number[];
          created_at: string;
        }[]
      | null;
  } = $props();

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
    console.log("mouten");
    if (canvas) {
      chart = new Chart(canvas, {
        type: "line",
        data: {
          labels: makeDate(), // X-axis labels
          datasets: [
            {
              label: "CPU Usage",
              data: makeCpuData(), // Y-axis data
              borderColor: "var(--color-primary)",
              backgroundColor: "var(--color-primary)",
              borderWidth: 0,
              pointRadius: 0,
              fill: true,
              tension: 0.4,
              tooltip: {
                callbacks: {
                  labelColor: function (context) {
                    return {
                      borderColor: "#f0f0f0",
                      backgroundColor: "#f0f0f0",
                    };
                  },
                  labelTextColor(tooltipItem) {
                    return "#f0f0f0";
                  },
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
          label: "Gráfico",
          data: makeCpuData(), // Y-axis data
          borderColor: "#a1d1de",
          backgroundColor: "#a1d1de",
          borderWidth: 0,
          pointRadius: 3,
          fill: true,
          animation: {
            duration: 0,
          },
          tension: 0,
          tooltip: {
            callbacks: {
              labelColor: function (context) {
                return {
                  borderColor: "#ffffff",
                  backgroundColor: "#ffffff",
                };
              },
              labelTextColor(tooltipItem) {
                return "#ffffff";
              },
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

<div class="w-full h-96 bg-card rounded-lg shadow-lg p-4">
  <canvas
    id="cpuChart"
    bind:this={canvas}
    class="text-text-primary"
    style="width: 100%; height: 100%;"
  ></canvas>
</div>

<style>
</style>
