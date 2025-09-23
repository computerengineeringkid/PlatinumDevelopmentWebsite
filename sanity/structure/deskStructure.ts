import type {StructureBuilder} from 'sanity/desk'

const singletonTypes = ['hero', 'about', 'contact']

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      ...singletonTypes.map((typeName) =>
        S.listItem()
          .title(typeName.charAt(0).toUpperCase() + typeName.slice(1))
          .child(
            S.document()
              .schemaType(typeName)
              .documentId(typeName)
          )
      ),
      S.divider(),
      S.documentTypeListItem('portfolio').title('Portfolio Projects'),
      ...S.documentTypeListItems().filter(
        (listItem) => ![...singletonTypes, 'portfolio'].includes(listItem.getId() || '')
      ),
    ])

export const defaultDocumentNode = (S: StructureBuilder) => {
  return S.document().views([S.view.form()])
}

export default deskStructure
