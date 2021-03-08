// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const OrderStateLabelFragmentDoc: DocumentNode<OrderStateLabelFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'OrderStateLabel' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CustomerOrder' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'quantity_ordered' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity_shipped' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity_canceled' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity_invoiced' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity_refunded' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity_returned' } },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type OrderStateLabelFragment = {
  items?: Types.Maybe<
    Array<
      Types.Maybe<
        | Pick<
            Types.DownloadableOrderItem,
            | 'quantity_ordered'
            | 'quantity_shipped'
            | 'quantity_canceled'
            | 'quantity_invoiced'
            | 'quantity_refunded'
            | 'quantity_returned'
          >
        | Pick<
            Types.BundleOrderItem,
            | 'quantity_ordered'
            | 'quantity_shipped'
            | 'quantity_canceled'
            | 'quantity_invoiced'
            | 'quantity_refunded'
            | 'quantity_returned'
          >
        | Pick<
            Types.OrderItem,
            | 'quantity_ordered'
            | 'quantity_shipped'
            | 'quantity_canceled'
            | 'quantity_invoiced'
            | 'quantity_refunded'
            | 'quantity_returned'
          >
      >
    >
  >
}