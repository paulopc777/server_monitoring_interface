<script lang="ts">
  import classNames from "classnames";
  import { Trash } from "@lucide/svelte";
  let { label, status, is_delete, handleDelete } = $props<{
    label: string;
    status?: string;
    is_delete?: boolean;
    handleDelete?: () => void;
  }>();

  let open = $state<boolean>(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore slot_element_deprecated -->
<div
  class="relative w-fit"
  on:mouseenter={() => (open = true)}
  on:mouseleave={() => (open = false)}
>
  <slot></slot>
  <div
    class={classNames(
      " bg-card border-primary-border px-5 py-2 border-1 transition-all absolute rounded-md top-1/4 translate-y-3/4",
      {
        "opacity-100": open,
        "opacity-0": !open,
      }
    )}
  >
    <div class="flex gap-2 items-center justify-center">
      {label}
      {#if status}
        <!-- svelte-ignore element_invalid_self_closing_tag -->
        <span
          class={classNames("w-4 h-4 rounded-full", {
            "bg-primary": status === "200",
            "bg-primary-red": status !== "200",
          })}
        />
      {/if}
      {#if is_delete}
        <!-- svelte-ignore element_invalid_self_closing_tag -->
        <button
          on:click={handleDelete}
          class="hover:text-primary-red transition-all"
        >
          <Trash size={13} />
        </button>
      {/if}
    </div>
  </div>
</div>
