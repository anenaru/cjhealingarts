import { defineField, defineType } from 'sanity'

export const youtubeEmbed = defineType({
  name: 'youtube',
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste a YouTube video URL (e.g. https://www.youtube.com/watch?v=...)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption',
    },
    prepare({ url, caption }) {
      return {
        title: caption ?? 'YouTube Embed',
        subtitle: url,
      }
    },
  },
})
