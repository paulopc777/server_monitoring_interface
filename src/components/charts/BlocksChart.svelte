<script lang="ts">
  let { items, maxValue = 100 } = $props<{
    items: Array<{ label: string; value: number }>;
  }>();

  const generateColors = (value: number) => {
    const green = "var(--color-primary)";
    const red = "var(--color-primary-red)";
    const blue = "var(--color-primary-blue)";

    const ratio = value / maxValue;
    if (ratio < 0.5) {
      return green;
    } else if (ratio < 0.8) {
      return blue;
    } else {
      return red;
    }
  };
</script>

<div class="flex flex-row flex-wrap justify-between gap-1">
  {#each items as item, index}
    <div
      class="mb-2 w-2.5 h-2.5 transition-all"
      style={`background-color: ${generateColors(item.value)}`}
    ></div>
  {/each}
</div>
