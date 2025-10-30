<script lang="ts">
  import { onMount } from "svelte";
  import {
    getUrlStatus,
    deleteUrlStatus,
    createUrlStatus,
  } from "../../service/api";
  import classnames from "classnames";
  import Tooltip from "../ui/Tooltip.svelte";

  let urlStatus = $state<
    | {
        id: number;
        url: string;
        status_code: string;
        created_at: string;
      }[]
    | null
  >(null);

  let showInput = $state(false);
  let newUrl = $state("");

  const fetchUrlStatus = async () => {
    try {
      const response = await getUrlStatus();
      urlStatus = response;
    } catch (error) {
      console.error("Error fetching URL status:", error);
    }
  };

  const formatUrl = (url_current: string) => {
    let url = url_current
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "");
    if (url.length > 15) {
      url = "..." + url.slice(-15);
    }
    return url;
  };

  onMount(() => {
    fetchUrlStatus();
  });

  const deleteUrl = (id: number) => {
    deleteUrlStatus(id)
      .then(() => {
        if (urlStatus) {
          urlStatus = urlStatus.filter((status) => status.id !== id);
        }
      })
      .catch((error) => {
        console.error("Error deleting URL status:", error);
      });
  };

  const handleAddUrl = async () => {
    if (!newUrl.trim()) return;

    try {
      let request_url = newUrl.trim();
      if (
        !request_url.startsWith("http://") &&
        !request_url.startsWith("https://")
      ) {
        request_url = "http://" + request_url;
      }

      await createUrlStatus(request_url);
      newUrl = "";
      showInput = false;
      await fetchUrlStatus();
    } catch (error) {
      console.error("Error creating URL status:", error);
    }
  };

  const toggleInput = () => {
    showInput = !showInput;
    if (!showInput) {
      newUrl = "";
    }
  };
</script>

<div class="my-4 flex gap-4 flex-wrap">
  <div>
    {#if showInput}
      <div class="flex gap-2 items-center">
        <input
          type="text"
          bind:value={newUrl}
          placeholder="https://example.com"
          class="h-8 px-3 rounded-sm border border-gray-300 text-sm flex-1"
          onkeydown={(e) => e.key === "Enter" && handleAddUrl()}
        />
        <button
          onclick={handleAddUrl}
          class="h-8 px-4 rounded-sm bg-primary text-text-secondary text-sm hover:opacity-80"
        >
          Adicionar
        </button>
        <button
          onclick={toggleInput}
          class="h-8 px-4 rounded-sm bg-gray-300 text-gray-700 text-sm hover:opacity-80"
        >
          Cancelar
        </button>
      </div>
    {:else}
      <button
        onclick={toggleInput}
        class="h-8 w-fit rounded-sm flex justify-center items-center px-4 bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <p class="text-gray-700 text-sm">+ Adicionar URL</p>
      </button>
    {/if}
  </div>

  {#if urlStatus}
    {#each urlStatus as status}
      <Tooltip
        label={status.status_code}
        status={status.status_code}
        is_delete
        handleDelete={() => deleteUrl(status.id)}
      >
        <div
          class={classnames(
            "h-8 w-fit rounded-sm flex justify-center items-center px-4",
            {
              "bg-primary": status.status_code === "200",
              "bg-primary-blue": status.status_code === "0",
              "bg-primary-red": status.status_code !== "200" && status.status_code !== "0",
            }
          )}
        >
          <p class="text-text-secondary text-sm">
            {formatUrl(status.url)}
          </p>
        </div>
      </Tooltip>
    {/each}
  {:else}
    <p>Loading URL status...</p>
  {/if}
</div>
