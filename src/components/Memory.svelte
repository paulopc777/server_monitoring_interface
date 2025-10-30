<script lang="ts">
  import { onMount } from "svelte";
  import { getMemory } from "../service/api";
  import Card from "./ui/Card.svelte";

  let memory_data = $state<{
    total_memory: number;
    used_memory: number;
    free_memory: number;
  }>({
    total_memory: 0,
    used_memory: 0,
    free_memory: 0,
  });

  async function fetchMemoryData() {
    try {
      const data = await getMemory();
      memory_data = data;
    } catch (error) {
      console.error("Error fetching memory data:", error);
    }
  }

  onMount(() => {
    fetchMemoryData();
    setInterval(fetchMemoryData, 10000);
  });

  const CalcWidth = (value: number, total: number) => {
    if (value === 0 || total === 0) return "0%";
    let width = (value / total) * 100;
    return `${width.toFixed(1)}%`;
  };
</script>

<Card className="h-full flex flex-col justify-between ">
  <div class="flex gap-4 justify-start mx-2">
    <div class="text-primary-blue">
      <p>
        <small> Total: </small>
      </p>
      <p>{memory_data.total_memory} MB</p>
    </div>
    <div class="text-primary-red">
      <p>
        <small> Usada: </small>
      </p>
      <p>{memory_data.used_memory} MB</p>
    </div>
    <div class="text-primary">
      <p>
        <small>Livre: </small>
      </p>
      <p>{memory_data.free_memory} MB</p>
    </div>
  </div>
  <!-- barra de uso de memória -->
  <div
    class="flex flex-row rounded-xl p-1 bg-card shadow-zinc-800"
    style:width={CalcWidth(memory_data.total_memory, memory_data.total_memory)}
  >
    <div
      id="Used"
      class="h-3 bg-primary-red rounded-3xl transition-all duration-500 card-shadow-inner"
      style:width={CalcWidth(memory_data.used_memory, memory_data.total_memory)}
    ></div>
    <div
      id="Free"
      class="h-3 bg-primary rounded-3xl shadow transition-all duration-500 card-shadow-inner"
      style:width={CalcWidth(memory_data.free_memory, memory_data.total_memory)}
    ></div>
  </div>
</Card>

<style>
  .card-shadow-inner {
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.45);
  }
</style>
