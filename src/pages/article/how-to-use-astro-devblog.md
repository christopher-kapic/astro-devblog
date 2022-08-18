---
layout: ../../layouts/Article.astro
id: article-1660587952751-xbTzNBe5n
medium: false
devto: false
title: How to use Astro Devblog
author:
  - value: author-1660337033199-jpFG6u1fX
    label: Christopher Kapic
summary: Use Astro devblog to host your own developer blog for free and
  automatically republish to Medium and Dev.to.
image: /cms/veeterzy-smqil_2v4vs-unsplash.jpg
tags:
  - astro
publishDate: 2022-08-15T18:25:52.846Z
updateDate: 2022-08-15T18:25:52.857Z
---
See the [YouTube video](https://youtu.be/8c7_vX3XPDc) or the [git repo](https://github.com/christopher-kapic/astro-devblog).

For those of you who just want instructions, scroll down to the *instructions* section.
## Why Astro?
Astro is a static site generator (and more), which has several good implications for your developer blog:
1. Astro is fast. Since Astro ships with no JavaScript by default, load times are *blazingly* fast (okay, I did kind of give in to the meme🔥). For a use case like a personal developer blog, using a frontend library like React simply is not necessary, so a framework like Astro makes site performance good by default.
2. Static sites can be hosted for cheap. Or, even free. Should you choose to use an option like [Netlify](https://netlify.com/), the only cost for hosting is your domain name *(if you choose something like CockroachDB for your database).
## What is special about Astro Devblog?
I created Astro Devblog for two primary reasons:
1. automatically publish content from my [blog](https://christopherkapic.com/) to Medium and Dev.to (without pulling from RSS, which requires more manual intervention on my part)
2. Use Astro with a simple setup process so that others could use the template fairly easily.
## How are my articles republished?
Articles are republished as part of the build step. Astro Devblog uses NetlifyCMS, which updates your Git repository when you publish a post. This, in turn, triggers a Netlify build, updating your site. The script `republish.ts` is run as part of the build step.
`republish.ts` checks each post to see whether it has already been published (using a database--I suggest using *[CockroachDB](https://cockroachlabs.com)'s free serverless tier). If the post has not been republished and the author's API keys are known, the post is published using Medium and Dev.to's APIs.
## Instructions
1. Before clicking the `Deploy to Netlify` button, generate a serverless CockroachDB database in the [cloud](https://cockroachlabs.cloud/) (This database will remain small and only be queried in the build step, so it is unlikely that you will exceed the free tier unless you have many, many authors with many, many articles). When you have your connection string, proceed to the next step.
2. Click the `Deploy to Netlify` button:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/christopher-kapic/astro-devblog"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

Follow the instructions in the UI to deploy your blog.
In short order, you should see your deployment URL where you can visit the site. Technically, at this point, your blog is live, but there are several other things you likely want to setup.

3. NetlifyCMS - You must enable Git Gateway and invite yourself as a user via Netlify Identity (in the Netlify UI).
4. Add yourself as an author in NetlifyCMS (`https://yoursite.netlify.app/admin`). Create and publish one article (this can be deleted later, but if you have an article then it will generate your author in the database).
5. Add your API keys to your author entity in CockroachDB. For this, you will have to obtain your [Medium](https://medium.com/) and [Dev](https://dev.to) API keys, as well as your Medium ID. Then, clone your repo to your local machine and create your environment file:
```bash
git clone [repo]
cd [repo]
touch .env
echo "DATABASE_URL=cockroachdb connection string" > .env
npm install
npx prisma generate
```
At this point, we will use Prisma studio to add your API keys to your author entity. Run `npx prisma studio` to start the studio. Once the studio server is live, open it in your web browser, navigate to your author entity, and add your API Keys. You will also need to add your Medium ID. Note: __This is NOT your username__. In order to acquire your ID, paste your Medium API key into the environment variable in `getMediumId.mjs` (or set your `MEDIUM_KEY` environment variable) and run `npm run medkey`. This should return JSON which includes your Medium ID, which you can then paste into Prisma studio.
Once you have done this, your blog is fully functioning, at least insofar as is possible without modifying the template.

That being said, I encourage you to modify the template. Adjust the UI theme to your liking. If there are any functional improvements, feel free to submit a pull request against the original repository in order to help out future users of the template.

## Some considerations
Astro Devblog is just a template--there are improvements that you can make which I have not done with the template itself which may help improve functionality, performance, and/or aesthetics. Here are the main ones that come to mind:
- Optimize picture hosting
  - This could be done using an image transformation API endpoint, service, or an optimization at build time. The template simply serves the images as you upload them to NetlifyCMS, which might result in poor load times.
- Improve the UI/styling
  - Specifically, I think that the `src/layouts/Article.astro` styling can be improved--I had some trouble getting styles to pass to `<slot/>`, and I believe (though am not 100% sure) that my use of global styling is adversely affecting the styling of the navbar and footer.
- Improve security
  - It would be good to enable a better security for your API keys. Some options would be to use environment variables (if your site is a single-author site) or encrypt the API keys so that they are not stored in the database as raw strings.
  - Add error handling to the `republish.ts` script. As it stands, the only way to tell if there was an error is to read the build output on Netlify.

I will personally be done contributing to the template as I have other projects to which I would like to devote my time. That being said, I check Github often, and will consider any pull requests (especially if it solves one of the considerations mentioned above).