<script lang='ts'>
  import type { Author } from '../types/author.type'
  export let authors = [];
  let selected = 0;
</script>

<section>
  <div class="py-20 bg-gray-50 radius-for-skewed">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap items-center -mx-3">
        <div class="w-full lg:w-1/3 px-3 mb-8 lg:mb-0">
          <ul class="flex flex-wrap flex-row lg:flex-col justify-center lg:justify-start space-x-6 lg:space-x-0">
            {#each authors as author, i}
              <li>
                <button class={`text-2xl lg:text-4xl mb-4 font-bold ${selected === i ? "" : "hover:text-gray-400 text-gray-300"}`} on:click={() => {
                  selected = i;
                }}>{author.title}</button>
              </li>
            {/each}
          </ul>
        </div>
        <div class="w-full lg:w-2/3 px-3">
          <div class="flex p-6 flex-wrap bg-white rounded-lg shadow">
            <div class="w-full lg:w-1/2 lg:pr-3">
              <img class="h-80 lg:h-auto w-full lg:w-auto object-cover rounded-lg" src={authors[selected].portraitPhoto} alt={`Portrait of ${authors[selected].title}`}>
            </div>
            <div class="w-full lg:w-1/2 lg:pl-3 lg:mt-6 order-first lg:order-last">
              <h4 class="text-2xl font-bold font-heading">{authors[selected].title}</h4>
              <p class="mb-6 text-gray-500 leading-loose">{authors[selected].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>