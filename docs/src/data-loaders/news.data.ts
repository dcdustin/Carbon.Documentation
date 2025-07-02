import { ContentData, createContentLoader } from 'vitepress'

export interface NewsPost extends ContentData {
  date: {
    time: number
    string: string
  }
}

declare const data: NewsPost[]
export { data }

export default createContentLoader('/news/docs/*.md', {
  includeSrc: true,
  render: true,
  transform(rawData) {
    return rawData
      .map((x): NewsPost => {
        return {
          ...x,
          date: formatDate(x.frontmatter.date),
        }
      })
      .sort((a, b) => b.date.time - a.date.time)
  },
})

function formatDate(raw: string) {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
