# Writing UI Components

- A UI Component **must not** only be an assembly of other components without
  modifying the behavior / styles / layout of children.
- A UI Component **must not** implement any GraphQL components

## Theming solution

## UI Component theming and layouts

- A UI Component **must** expose a `classes` prop to allow for style overrides

For the users of components it’s vital that they are able to customize the theme
and layout of a component.

A lot can be accomplished by modifying the CSS of a component, to make this
possible we expose the `classes` property of a component. We’re following the
Material UI guidelines in this ragard:
https://material-ui.com/styles/advanced/#makestyles

Below is a full typescript example:

```tsx
import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'

const useStyles = makeStyles((theme: Theme) => ({
  myComponentRoot: {
    //..your styles
  },
}))

export type MyComponentProps = React.PropsWithChildren<
  UseStyles<typeof useStyles>
>

function MyComponent(props: MyComponentProps) {
  const classes = useStyles(props)
  return <div className={classes.myComponentRoot}>{children}</div>
}
```

## UI Component styling

- A UI Component **should** use a mobile first development strategy
- A UI Component **should** use theme variables where possible

```tsx
const useStyles = makeStyles((theme: Theme) => ({
  myComponentRoot: {
    // We should use breakpoints.up() instead of breakpoints.down()
    width: '100%',
    padding: theme.spacings.sm,
    marginBottom: theme.spacings.lg,
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
  },
}))
```

## UI Component `responsiveVal` and `theme.spacings.\*`

- A UI Component **may** use `responsiveVal` to have responsive pixelvalues
- A UI Component **must not** use `responsiveVal` in breakpoints.
- A UI Component **may** use `theme.spacings.*` to have responsive spacing
- A UI Component **must not** use `theme.spacings.*` in breakpoints.

```tsx
const useStyles = makeStyles((theme: Theme) => ({
  myComponentRoot: {
    width: responsiveVal(280, 600),
    marginBottom: theme.spacings.md,

    [theme.breakpoints.up('md')]: {
      width: responsiveVal(500, 1200), // This is not allowed, since we're in a breakpoint
      marginBottom: theme.spacings.lg, // This is not allowed, since we're in a breakpoint
    },
  },
}))
```

## Composing multiple UI Component

- A UI Component **should** merge and expose the `classes` prop of child
  components.

If a component is composed of multiple other components we need to pass through
all the available `classes` from the parent to the child.

Example that exposes the classes of `MyComponent`

```tsx
const useStyles = makeStyles((theme: Theme) => ({
  myWrappingComponentRoot: {
    //..your styles
  },
}))

type MyWrappingComponentProps = React.PropsWithChildren<
  UseStyles<typeof useStyles> & Pick<MyComponentProps, 'classes'>
>

function MyWrappingComponent(props: MyWrappingComponentProps) {
  const classes = useStyles(props)
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>{children}</MyComponent>
    </div>
  )
}
```

There however is an exception:

## Global Styles: Styling deeply nested Button/TextField/Link/Badge/List/etc. components.

To style these components, we use Material-UI’s global theming functionality:
https://material-ui.com/customization/globals/#global-css

As a component implementor, you therefor do not need to expose all button
classes, for example:

If the previous component uses the following renderer instead, we do not need to
expose all button classes.

```tsx
function MyComponent() {
  //...other stuff
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>
        <Button>{children}</Button>
      </MyComponent>
    </div>
  )
}
```

## Exposing props

- A UI Component **may** pass-though props of child components by using
  `Pick<Component, 'prop'>`
- A UI Component **should not** pass-though all props of a child component,
  since this makes the API very large.

We of course are allowed to expose props of `<Button/>` like `variant` etc.

```tsx
// of course, also add all the UseStyles, etc, see above examples.
type MyOtherComponentProps = Pick<ButtonProps, 'variant'>

function MyOtherComponent({ variant }: MyOtherComponentProps) {
  //...other stuff
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>
        <Button variant={variant}>{children}</Button>
      </MyComponent>
    </div>
  )
}
```