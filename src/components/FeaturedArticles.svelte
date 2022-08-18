<script lang='ts'>
  import type { PostType } from '../types/post.type';
  export let selected = 'All';
  export let posts: PostType[] = [];
  posts.sort((a, b) => {
    const a_date: Date = new Date(a.frontmatter.publishDate)
    const b_date: Date = new Date(b.frontmatter.publishDate)
    if (a_date < b_date) {
      return 1;
    }
    return -1;
  });
  let categories: string[] = ['All'];
  posts.forEach(post => {
    for (let tag of post.frontmatter.tags) {
      if (!categories.includes(tag)) {
        categories.push(tag)
      }
    }
  });

  const dateOptions: {month: 'short', day: 'numeric', year: 'numeric'} = {month: 'short', day: 'numeric', year: 'numeric'}
</script>

<section>
  <div class="py-20 bg-gray-50 radius-for-skewed">
    <div class="container mx-auto px-4">
      <div class="mb-16 flex flex-wrap items-center">
        <div class="w-full lg:w-1/2">
          <span class="text-green-600 font-bold">Browse articles by topc</span>
          <h2 class="text-4xl lg:text-5xl font-bold font-heading">Featured Posts</h2>
        </div>
        <!-- <div class="hidden lg:block text-right w-1/2"><a class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200" href="#">View More Articles</a></div> -->
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
          <div class="py-4 px-6 bg-white shadow rounded">
            <h4 class="mb-4 text-gray-500 font-bold uppercase">Tags</h4>
            <ul>
              <!-- <li><button class="block w-full text-left py-2 px-3 mb-4 rounded text-green-600 font-bold bg-gray-50">All</button></li> -->
              {#each categories as category}
                <li><button class={`block w-full text-left py-2 px-3 mb-4 rounded hover:text-green-600 hover:bg-gray-50 ${selected === category ? "bg-gray-50 text-green-600 font-bold" : ""}`} on:click={() => {selected=category}}>{category}</button></li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="w-full lg:w-3/4 px-3">
          {#each posts as post}
            {#if post.frontmatter.tags.includes(selected) || selected == 'All'}
            <div class="flex flex-wrap -mx-3 mb-8 lg:mb-6">
              <div class="mb-4 lg:mb-0 w-full lg:w-1/4 px-3">
                <img class="w-full h-full object-cover rounded" src={post.frontmatter.image} alt="">
              </div>
              <div class="w-full lg:w-3/4 px-3">
                <a class="hover:underline" href={`${post.frontmatter.url}`}>
                  <h3 class="mb-1 text-2xl font-bold font-heading">{post.frontmatter.title}</h3>
                </a>
                <div class="mb-2 flex items-center text-sm">
                  <a class="text-green-600 hover:underline hover:text-green-700" href={post.frontmatter.url}>{post.frontmatter.author[0].label}</a>
                  <span class="text-gray-400 mx-2">•</span>
                  <span class="text-gray-400">{new Date(post.frontmatter.publishDate).toLocaleDateString('en-US', dateOptions)}</span>
                </div>
                <p class="text-gray-500">{post.frontmatter.summary}</p>
              </div>
            </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
