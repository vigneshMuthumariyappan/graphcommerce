# Framer Next Pages

- Ability to create pages that are overlays over other pages.
- Ability to create multiple levels of overlays over other pages.
- Ability to create entry and exit animations.
- Ability to maintain a SharedComponent between multiple pages.
- Handles proper scroll position

This package does not provide any actual overlays, that is up to the
implementor.

## Installing

Create a `pages/_app.ts` file:

```tsx
import { FramerNextPages } from '@reachdigital/framer-next-pages'
import { AppPropsType } from 'next/dist/next-server/lib/utils'

export default function App({ router, Component, pageProps }: AppPropsType) {
  return (
    <FramerNextPages
      router={router}
      Component={Component}
      pageProps={pageProps}
    />
  )
}
```

Enable Next's `scrollRestoration`:

```js
const config = {
  experimental: {
    scrollRestoration: true,
  },
}
```

## Creating overlays

### Create a page that works as an overlayGroup:

Define pageOptions on a page. This can be any static or dynamic page:

Example routes:

- `pages/overlay.tsx`
- `pages/overlay/[overlayId].tsx`

```tsx
import { PageOptions } from '@reachdigital/framer-next-pages'

export default function Overlay() {
  return <MyOverlay>blabla</MyOverlay>
}

Overlay.pageOptions = {
  overlayGroup: 'left',
} as PageOptions
```

### Create an overlay that doesn't share the layout in a dynamic routes:

Define `key` as router.asPath in pageOptions.

Example route:

- `pages/overlay/[overlayId]`

```tsx
import { PageOptions } from '@reachdigital/framer-next-pages'

Overlay.pageOptions = {
  overlayGroup: 'left',
  sharedsharedKey: (router) => router.asPath, // will return pages/overlay/123
} as PageOptions
```

### Create an overlay that shares the layout between different dynamic routs:

Define `key` as a static value in pageOptions in your routes.

Example routes:

- `pages/account.tsx`
- `pages/account/orders.tsx`
- `pages/account/orders/[orderId].tsx`

```tsx
import { PageOptions } from '@reachdigital/framer-next-pages'

Overlay.pageOptions = {
  overlayGroup: 'left',
  sharedKey: () => 'account',
} as PageOptions
```

## SharedComponent

To create a stable layout between multiple routes we can define a
SharedComponent.

Example route:

- `pages/overlay/[overlayId]`

```ts
CmsPage.pageOptions = {
  SharedComponent: SheetShell,
} as PageOptions
```

### Passing props to a SharedComponent with sharedProps

```ts
CmsPage.pageOptions = {
  SharedComponent: SheetShell,
  sharedProps: { variant: 'bottom' },
} as PageOptions
```

### Passing props to a SharedComponent with getStaticProps

```ts
export function getStaticProps() {
  return {
    variant: 'bottom',
  }
}
```

### Create a SharedComponent between multiple routes

```ts
const pageOptions: PageOptions<SheetShellProps> = {
  SharedComponent: SheetShell,
  sharedKey: () => 'page',
}
```

```ts
const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account',
}
```

## Hooks

We have multiple hooks available to animate based on certain states, etc.

```tsx
export default function MyComponent() {
  const direction = usePageDirection()
  const depth = usePageDepth()
  const pageRouter = usePageRouter()
}
```

### usePageRouter

The pageRouter maintains state for the old page.

E.g.:

- `/my-regular-page`:
  - `useRouter().asPath === '/overlay'`
  - `usePageRouter().asPath === '/my-regular-page'` We maintain the state
- `/overlay`: `usePageDepth() === 0`
  - `useRouter().asPath === '/overlay'`
  - `usePageRouter().asPath === '/overlay'`

### usePageDepth

If we have multiple pages layered on top of each other we get the depth the page
has.

E.g.

- `/my-regular-page`: `usePageDepth() === 0`

After navigating to overlay-one:

- `/my-regular-page`: `usePageDepth() === -1`
- `/overlay-one`: `usePageDepth() === 0`

After navigation to overlay-two

- `/my-regular-page`: `usePageDepth() === -2`
- `/overlay-one`: `usePageDepth() === -1`
- `/overlay-two`: `usePageDepth() === 0`

### usePageDirection

- Will return `usePageDirection() === 1` when navigating forward
- Will return `usePageDirection() === -1` when navigating back

## Fallback routes

When an overlay is accessed by URL, it will render but it won't render as a
normal page. You can provide a fallback to render something in this case.

### Workins

Creates a `pageList` containing all the pages that should be rendered on top of
each other.

Each time a new page is provided to `<FramerNextPages />` it will add them to
the pageList. This pageList is remembered when navigating between pages.

If an overlay is rendered, we find the closest 'regular' page (that isn't an
overlay) and render from that page until the current active page.

Uses Framer's
[AnimatePresence](https://www.framer.com/api/motion/animate-presence/) to
animate pages in and out of existence.