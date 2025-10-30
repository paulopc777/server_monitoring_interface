<script>
  export let className = "";
</script>

<div class={`bg-card rounded-lg shadow-md p-4 ${className}  border-primary-border border-1`}>
  <slot />
</div>
