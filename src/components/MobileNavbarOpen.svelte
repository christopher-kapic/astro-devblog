<script lang="ts">
  import { isMobileNavbarOpen } from '../stores'
  import { settings } from '../settings'
</script>

<div class="{$isMobileNavbarOpen ? '' : 'hidden'} navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50">
    <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
    <nav class="relative flex flex-col py-6 px-6 h-full w-full bg-white border-r overflow-y-auto">
        <div class="flex items-center mb-8">
            <a class="mr-auto text-3xl font-bold leading-none text-gray-900" href="/">
                {settings.site_name}
            </a>
            <button class="navbar-close" on:click={() => isMobileNavbarOpen.set(!$isMobileNavbarOpen)}>
                <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>
        <div>
            <ul>
                {#each settings.navbar_links as link}
                    <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-500 hover:bg-green-50 hover:text-green-600 rounded" href={link.href}>{link.title}</a></li>
                {/each}
            </ul>
        </div>
        <div class="mt-auto">
            <p class="my-4 text-xs text-center text-gray-400">
                <span>© 2022 All rights reserved.</span>
            </p>
            <div class="text-center">
                {#if settings.facebook}
                    <a class="inline-block px-1" href={settings.facebook || "https://facebook.com"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                {/if}
                {#if settings.instagram}
                    <a class="inline-block px-1" href={settings.instagram || "https://instagram.com"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </a>
                {/if}
                {#if settings.twitter}
                    <a class="inline-block px-1" href={settings.twitter || "https://twitter.com/kapicode"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                {/if}
            </div>
        </div>
    </nav>
</div>