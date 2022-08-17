type Author = {
  value: string,
  label: string
}

export type PostType = {
  frontmatter: {
    layout: string,
    medium: boolean,
    devto: boolean,
    id: string,
    title: string,
    author: Author[],
    summary: string,
    image: string,
    tags: string[],
    publishDate: string,
    updateDate: string,
    url: string,
    file: string
  },
  file: string,
  url: string
}