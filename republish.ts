const { PrismaClient } = require("@prisma/client");
const { readdirSync } = require("fs");
const matter = require("gray-matter");
const prisma = new PrismaClient();
const authors_json = require("./src/pages/_cms/authors.json");

type AuthorCMSType = {
  id: string;
  title: string;
  description: string;
  profilePhoto: string;
  portraitPhoto: string;
  twitter: string;
  website: string;
};

const url = process.env.URL;

async function republish() {
  console.log("\nRepublishing articles to Medium and Dev...\n");
  const files = readdirSync("./src/pages/article");
  for (let _file of files) {
    const file = matter.read(`./src/pages/article/${_file}`);
    const authors_json_filtered = authors_json.authors.filter((_a: AuthorCMSType) => {
      return _a.id === file.data.author.value;
    });
    const author = await prisma.author.upsert({
      where: {
        id: file.data.author[0].value,
      },
      update: {
        id: file.data.author[0].value,
        name: file.data.author[0].label
      },
      create: {
        id: file.data.author[0].value,
        name: file.data.author[0].label
      },
    });
    const article = await prisma.article.upsert({
      where: {
        id: file.data.id,
      },
      update: {
        id: file.data.id,
        authorId: file.data.author[0].value,
      },
      create: {
        id: file.data.id,
        authorId: file.data.author[0].value,
      },
    });
    if (
      file.data.medium &&
      !article.publishedToMedium &&
      author.mediumKey &&
      author.mediumId
    ) {
      // publish to medium
      console.log(`\nPublishing ${file.data.title} to Medium.`);
      await fetch(`https://api.medium.com/v1/users/${author.mediumId}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${author.mediumKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Charset": "utf-8",
        },
        body: JSON.stringify({
          title: file.data.title,
          contentFormat: "html",
          content: file.data.content,
          canonicalUrl: url + (file.path).substring(11).replace('.md', ''),
          tags: file.data.tags,
          publishStatus: "public",
        }),
      });

      const med_article = await prisma.article.upsert({
        where: {
          id: file.data.id,
        },
        update: {
          id: file.data.id,
          publishedToMedium: true,
        },
        create: {
          id: file.data.id,
          authorId: file.data.author[0].value,
          publishedToMedium: true,
        },
      });
    }
    if (file.data.devto && !article.publishedToDev && author.devtoKey) {
      // publish to dev
      console.log(`\nPublishing ${file.data.title} to dev.to`);
      const new_dev_article = await fetch("https://dev.to/api/articles", {
        headers: {
          "api-key": author.devtoKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          article: {
            title: file.data.title,
            published: "true",
            body_markdown: file.data.content,
            tags: file.data.tags,
            main_image: file.data.image,
            canonical_url: url + (file.path).substring(11).replace('.md', ''),
            description: file.data.summary,
          }
        })
      })

      const new_dev_article_json = await new_dev_article.json();

      const dev_article = await prisma.article.upsert({
        where: {
          id: file.data.id,
        },
        update: {
          id: file.data.id,
          publishedToDev: true,
        },
        create: {
          id: file.data.id,
          authorId: file.data.author[0].value,
          devId: new_dev_article_json.id,
          publishedToDev: true,
        },
      });
    } else if (
      file.data.updateDate > article.updatedAt &&
      file.data.devto &&
      author.devtoKey
    ) {
      // update on dev.to
      console.log(`\nUpdating ${file.data.title} on dev.to. (As of August 14, 2022 I (Christopher Kapic) do not believe Medium's API can update a post.)`);

      const _old_article = await prisma.article.findUniqueOrThrow({
        where: {
          id: file.data.id
        }
      })

      await fetch(`https://dev.to/api/articles/${_old_article.devId}`, {
        headers: {
          "api-key": author.devtoKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          article: {
            title: file.data.title,
            published: "true",
            body_markdown: file.data.content,
            tags: file.data.tags,
            main_image: file.data.image,
            canonical_url: url + (file.path).substring(11).replace('.md', ''),
            description: file.data.summary,
          }
        })
      })

      const _dev_article = await prisma.article.upsert({
        where: {
          id: file.data.id,
        },
        update: {
          id: file.data.id,
          publishedToDev: true,
        },
        create: {
          id: file.data.id,
          authorId: file.data.author[0].value,
        },
      });
    }
  }
}

republish();