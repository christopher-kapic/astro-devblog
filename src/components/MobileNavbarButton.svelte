<script lang="ts">
  import { isMobileNavbarOpen } from '../stores'
</script>

<button class="navbar-burger flex items-center text-white p-3" on:click={() => isMobileNavbarOpen.set(!$isMobileNavbarOpen)}>
  <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <title>Mobile menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
  </svg>
</button>