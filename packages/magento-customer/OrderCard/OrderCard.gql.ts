// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import { MoneyFragment, MoneyFragmentDoc } from '../../magento-store/Money.gql'
import {
  OrderCardItem_DownloadableOrderItem_Fragment,
  OrderCardItem_BundleOrderItem_Fragment,
  OrderCardItem_OrderItem_Fragment,
  OrderCardItemFragmentDoc,
} from '../OrderCardItem/OrderCardItem.gql'
import { TrackingLinkFragmentDoc, TrackingLinkFragment } from '../TrackingLink/TrackingLink.gql'

export const OrderCardFragmentDoc: DocumentNode<OrderCardFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'OrderCard' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CustomerOrder' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'number' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shipments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tracking' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'TrackingLink' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'total' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'grand_total' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Money' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OrderCardItem' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'order_date' } },
        ],
      },
    },
    ...TrackingLinkFragmentDoc.definitions,
    ...MoneyFragmentDoc.definitions,
    ...OrderCardItemFragmentDoc.definitions,
  ],
}
export type OrderCardFragment = Pick<Types.CustomerOrder, 'number' | 'order_date'> & {
  shipments?: Types.Maybe<
    Array<Types.Maybe<{ tracking?: Types.Maybe<Array<Types.Maybe<TrackingLinkFragment>>> }>>
  >
  total?: Types.Maybe<{ grand_total: MoneyFragment }>
  items?: Types.Maybe<
    Array<
      Types.Maybe<
        | OrderCardItem_DownloadableOrderItem_Fragment
        | OrderCardItem_BundleOrderItem_Fragment
        | OrderCardItem_OrderItem_Fragment
      >
    >
  >
}
