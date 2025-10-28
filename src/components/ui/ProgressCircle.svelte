<script lang="ts">
  export let value: number = 0; // Valor do progresso (0-100)
  export let color: string = '#3b82f6'; // Cor do progresso (azul por padrão)
  export let size: number = 120; // Tamanho do círculo
  export let strokeWidth: number = 8; // Largura da linha
  export let showText: boolean = true; // Mostrar texto no centro
  export let textColor: string = '#374151'; // Cor do texto

  // Calcular propriedades do círculo
  $: radius = (size - strokeWidth) / 2;
  $: circumference = 2 * Math.PI * radius;
  $: strokeDasharray = circumference;
  $: strokeDashoffset = circumference - (value / 100) * circumference;
  
  // Garantir que o valor esteja entre 0 e 100
  $: clampedValue = Math.min(100, Math.max(0, value));
</script>

<div class="progress-circle" style="width: {size}px; height: {size}px;">
  <svg width={size} height={size} class="circle-svg">
    <!-- Círculo de fundo -->
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke="#e5e7eb"
      stroke-width={strokeWidth}
      class="circle-bg"
    />
    
    <!-- Círculo de progresso -->
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke={color}
      stroke-width={strokeWidth}
      stroke-dasharray={strokeDasharray}
      stroke-dashoffset={strokeDashoffset}
      stroke-linecap="round"
      class="circle-progress"
    />
  </svg>
  
  {#if showText}
    <div class="progress-text" style="color: {textColor};">
      <span class="value">{Math.round(clampedValue)}%</span>
    </div>
  {/if}
</div>

<style>
  .progress-circle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .circle-svg {
    transform: rotate(-90deg);
    overflow: visible;
  }

  .circle-bg {
    opacity: 0.2;
  }

  .circle-progress {
    transition: stroke-dashoffset 0.6s ease-in-out;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: 600;
  }

  .value {
    font-size: 1.25rem;
    line-height: 1;
  }

  /* Responsividade para telas menores */
  @media (max-width: 640px) {
    .value {
      font-size: 1rem;
    }
  }
</style>