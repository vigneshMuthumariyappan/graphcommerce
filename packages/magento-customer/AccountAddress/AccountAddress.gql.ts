// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import {
  CustomerAddressFragment,
  CustomerAddressFragmentDoc,
} from '../CustomerAddress/CustomerAddress.gql'

export const AccountAddressFragmentDoc: DocumentNode<AccountAddressFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountAddress' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'CustomerAddress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CustomerAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'default_billing' } },
          { kind: 'Field', name: { kind: 'Name', value: 'default_shipping' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
    },
    ...CustomerAddressFragmentDoc.definitions,
  ],
}
export type AccountAddressFragment = Pick<
  Types.CustomerAddress,
  'default_billing' | 'default_shipping' | 'id'
> &
  CustomerAddressFragment