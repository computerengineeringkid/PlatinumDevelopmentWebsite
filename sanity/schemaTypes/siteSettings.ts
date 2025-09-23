import {Rule, defineField, defineType} from 'sanity'

const highlight = defineField({
  name: 'highlight',
  title: 'Highlight',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})

const stat = defineField({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
    defineField({name: 'value', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})

const partner = defineField({
  name: 'partner',
  title: 'Partner Logo',
  type: 'object',
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
    defineField({
      name: 'logo',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload a monochrome or transparent logo asset.',
    }),
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
})

const navigationLink = defineField({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
    defineField({
      name: 'href',
      type: 'string',
      validation: (rule: Rule<string>) => rule.required(),
      description: 'Use hash links like #portfolio to link to on-page sections.',
    }),
    defineField({
      name: 'isPrimary',
      title: 'Highlight as primary button',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (rule: Rule<string>) => rule.required(),
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (rule: Rule<string>) => rule.required(),
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [navigationLink],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({name: 'headline', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
        defineField({name: 'subheadline', type: 'text', rows: 3, validation: (rule: Rule<string>) => rule.required()}),
        defineField({name: 'ctaLabel', type: 'string'}),
        defineField({name: 'ctaHref', type: 'string'}),
        defineField({
          name: 'backgroundImage',
          type: 'image',
          options: {hotspot: true},
          description: 'Hero background image',
        }),
        defineField({name: 'backgroundAlt', type: 'string', title: 'Background Alt Text'}),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
        defineField({
          name: 'body',
          title: 'Body Content',
          type: 'array',
          of: [{type: 'text'}],
          validation: (rule: Rule<any[]>) => rule.min(1),
          description: 'Add one entry per paragraph. Plain text only.',
        }),
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'highlights',
          title: 'Highlights',
          type: 'array',
          of: [highlight],
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [stat],
        }),
      ],
    }),
    defineField({
      name: 'portfolioIntro',
      title: 'Portfolio Intro',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
        defineField({name: 'subheading', type: 'text', rows: 2}),
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partner Logos',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'string'}),
        defineField({name: 'subheading', type: 'text', rows: 2}),
        defineField({
          name: 'items',
          title: 'Partners',
          type: 'array',
          of: [partner],
        }),
      ],
    }),
    defineField({
      name: 'investor',
      title: 'Investor Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
        defineField({
          name: 'body',
          type: 'array',
          of: [{type: 'text'}],
          description: 'Add one entry per paragraph. Plain text only.',
        }),
        defineField({name: 'ctaLabel', type: 'string'}),
        defineField({name: 'ctaHref', type: 'string'}),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
        defineField({name: 'subheading', type: 'text', rows: 2}),
        defineField({name: 'infoHeading', type: 'string', title: 'Info Panel Heading'}),
        defineField({name: 'email', type: 'string'}),
        defineField({name: 'address', type: 'text', rows: 2}),
        defineField({name: 'hours', type: 'text', rows: 2}),
        defineField({
          name: 'mapEmbed',
          type: 'text',
          rows: 5,
          description: 'Optional HTML embed code for maps.',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({name: 'companyName', type: 'string'}),
        defineField({name: 'copyright', type: 'string'}),
        defineField({name: 'credits', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'companyName'},
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
        subtitle: 'Global content and configuration',
      }
    },
  },
})
