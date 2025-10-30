<script lang="ts">
  import { onMount } from "svelte";

  const { label, total = 10, used = 6, rotate = 0 } = $props();

  const size = $state(120);
  const radius = $state(3);

  const generateChart = () => {
    const svg = document.querySelector("svg");
    if (!svg) return;

    const angle = (Math.PI * 1.11) / total;

    for (let i = 0; i < total; i++) {
      const square = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );

      const x = 60 + 40 * Math.cos(i * angle) * 1.3;
      const y = 60 + 40 * Math.sin(i * angle) * -1 * 1.3;

      square.setAttribute("id", `square-${i}`);

      square.setAttribute("x", `${x}`);
      square.setAttribute("y", `${y}`);
      square.setAttribute(
        "transform",
        `rotate(${90 - (i * angle * 180) / Math.PI} ${x} ${y})`
      );
      square.setAttribute("width", "8");
      square.setAttribute("height", "11");
      square.setAttribute("rx", `${radius}`);
      square.setAttribute(
        "fill",
        total - used <= i
          ? "var(--color-primary)"
          : "var(--color-text-secondary)"
      );
      square.setAttribute(
        "style",
        `transition: all ${250}ms ease-in-out;`
      );
      svg.appendChild(square);
    }
  };

  const updateChart = () => {
    for (let i = 0; i < total; i++) {
      const square = document.getElementById(`square-${i}`);
      if (square) {
        square.setAttribute(
          "fill",
          total - used <= i
            ? "var(--color-primary)"
            : "var(--color-text-secondary)"
        );
      }
    }
  };

  onMount(() => {
    generateChart();
  });

  //   Handle update props

  $effect(() => {
    updateChart();
  });
</script>

<div class="relative" style="width: {size}px; height: {size - 40}px;">
  <div class="flex justify-center items-center">
    <svg
      transform="rotate({rotate})"
      width={size}
      height={size - 40}
      viewBox="0 0 120 80"
    >
    </svg>
  </div>
  <!-- Label -->
  <p
    class="absolute w-full hfull flex justify-center items-center left-0 text-center text-sm"
    style={`bottom:${size / 2 - 40}px;`}
  >
    <b>
      {label}
    </b>
  </p>
</div>
