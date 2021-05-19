# Using SVG icons

Themability, reusability, and extendability are important when using icons. The
SvgImage component takes care of this.

## SvgImage Component

The SvgImage component is useful for loading SVG icons. It loads a SVG file as
URL in an `<img>` element, so icons won't be added to the bundle.

Strengths:

- Optimized icon loading: either lazy or eager
- Strict typing
- Themable, extendable & reusable
- No increase in bundle size while we incrementally increase the amount of icons
  used
- Icon shades: muted, default or inverted

Weaknesses:

- As we import the icons as an image, we can't programmatically recolor them and
  have to use separate icons for each needed color
- HTTP request per icon

## Adding icons

Naming convention (`snake_case`):
`{icon!}_{identifier!}_{modifier?}_{color?}.svg`

- `examples/project/icons`: project specific icons
- `packages/next-ui/icons`: default icons

Add icon to index.tsx:

`export { default as iconName } from './icon_name.svg'`