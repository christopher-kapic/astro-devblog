import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind(), svelte()]
});