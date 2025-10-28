<script lang="ts">
  import { onMount } from "svelte";
  import { getMemory } from "../service/api";

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

<div class="my-4">
  <div class="flex gap-4 justify-center">
    <p class="text-purple-500">Total: {memory_data.total_memory} MB</p>
    <p class="text-blue-500">Usada: {memory_data.used_memory} MB</p>
    <p class="text-green-500">Livre: {memory_data.free_memory} MB</p>
  </div>
  <!-- barra de uso de memória -->
  <div
    class="flex flex-row rounded-xl p-1 bg-zinc-100"
    style:width={CalcWidth(memory_data.total_memory, memory_data.total_memory)}
  >
    <div
      id="Used"
      class="h-3 bg-blue-500 rounded-3xl shadow transition-all duration-500"
      style:width={CalcWidth(memory_data.used_memory, memory_data.total_memory)}
    ></div>
    <div
      id="Free"
      class="h-3 bg-green-500 rounded-3xl shadow transition-all duration-500"
      style:width={CalcWidth(memory_data.free_memory, memory_data.total_memory)}
    ></div>
  </div>
  <!-- legenda de uso de memória -->
  <div class="flex flex-row gap-4 mt-4">
    <div class="flex flex-row items-center gap-2 mb-2">
      <span class="w-5 h-5 rounded-3xl bg-blue-500"></span>
      <span
        >Usada:
        {CalcWidth(memory_data.used_memory, memory_data.total_memory)}
      </span>
    </div>
    <div class="flex flex-row items-center gap-2 mb-2">
      <span class="w-5 h-5 rounded-3xl bg-green-500"></span>
      <span
        >Livre: {CalcWidth(memory_data.free_memory, memory_data.total_memory)}
      </span>
    </div>
  </div>
</div>
