import type {StructureBuilder} from 'sanity/desk'

const singletonTypes = ['siteSettings']

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      ...singletonTypes.map((typeName) =>
        S.listItem()
          .title('Site Settings')
          .child(
            S.document()
              .schemaType(typeName)
              .documentId(typeName)
          )
      ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      ...S.documentTypeListItems().filter(
        (listItem) => ![...singletonTypes, 'project'].includes(listItem.getId() || '')
      ),
    ])

export const defaultDocumentNode = (S: StructureBuilder) => {
  return S.document().views([S.view.form()])
}

export default deskStructure
