import {Rule, defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule: Rule<string>) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule: Rule<string>) => rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'Retail', value: 'retail'},
          {title: 'Multifamily', value: 'multifamily'},
          {title: 'Single-Family', value: 'singleFamily'},
          {title: 'Mixed Use', value: 'mixedUse'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'In Progress', value: 'inProgress'},
          {title: 'Coming Soon', value: 'comingSoon'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule: Rule<any>) => rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      type: 'string',
      title: 'Image Alt Text',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'metric',
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
            defineField({name: 'value', type: 'string', validation: (rule: Rule<string>) => rule.required()}),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      subtitle: 'status',
    },
  },
})
