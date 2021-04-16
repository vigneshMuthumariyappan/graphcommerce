import {
  makeStyles,
  Snackbar,
  SnackbarContent,
  SnackbarProps,
  Fab,
  Theme,
  PropTypes,
  SnackbarContentClassKey,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

type Size = 'normal' | 'wide'
type Variant = 'contained' | 'pill'

type MessageSnackbarClassKey =
  | 'snackbarRoot'
  | SnackbarContentClassKey
  | `${SnackbarContentClassKey}${Capitalize<Size>}`

const useStyles = makeStyles(
  (theme: Theme) => ({
    snackbarRoot: {},
    anchorOriginBottomCenter: {
      left: 'unset',
      right: 'unset',
      transform: 'unset',
      bottom: '0',
      width: '100%',
      pointerEvents: 'none',
      [theme.breakpoints.up('md')]: {
        padding: `${theme.page.vertical} ${theme.page.horizontal}`,
      },
    },
    root: {
      pointerEvents: 'all',
      padding: `${theme.spacings.xxs} ${theme.page.vertical}`,
    },
    rootPill: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,

      [theme.breakpoints.up('md')]: {
        borderRadius: 50,
      },
    },
    rootPillLarge: {},
    rootPillColorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    message: {
      padding: 0,
      display: 'grid',
      alignItems: 'center',
      gap: theme.spacings.xs,
      gridTemplate: `
        "children close"
        "action action"
      `,
      [theme.breakpoints.up('md')]: {
        gridTemplate: `"children action close"`,
      },
    },
    children: {
      gridArea: 'children',
      ...theme.typography.h4,
      fontWeight: 400,
    },
    actionButton: {
      gridArea: 'action',
      margin: `${theme.spacings.xs} 0`,
      '& .MuiPillButton-pill': {
        width: '100%',
        padding: theme.spacings.xxs,
        borderRadius: 40,
      },
      [theme.breakpoints.up('md')]: {
        margin: 0,
        '& .MuiPillButton-pill': {
          width: '100%',
          padding: '8px 16px',
        },
      },
    },
    closeButton: {
      gridArea: 'close',
      '& .MuiSvgIcon-root': {
        height: 24,
      },
      '& .MuiFab-sizeMedium': {
        height: 36,
        width: 36,
      },
      [theme.breakpoints.up('md')]: {
        '& .MuiSvgIcon-root': {
          height: 28,
        },
        '& .MuiFab-sizeMedium': {
          height: 44,
          width: 44,
        },
      },
    },
  }),
  { name: 'MessageSnackbar' },
)

export type MessageSnackbarProps = Omit<
  SnackbarProps,
  'autoHideDuration' | 'onClose' | 'anchorOrigin'
> & {
  autoHide?: boolean
  variant?: Variant
  size?: Size
  color?: PropTypes.Color
  action?: React.ReactNode
  children?: React.ReactNode
}

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const [showSnackbar, setSnackbar] = useState<boolean>(false)

  const {
    variant = 'contained',
    size = 'normal',
    color = 'default',
    autoHide,
    action,
    open,
    message,
    children,
    ...snackbarProps
  } = props

  const classes = useStyles(props)

  useEffect(() => {
    if (open) setSnackbar(open)
  }, [open])

  const clsxBonus = (base: string) => {
    const Size = size[0].toUpperCase() + size.slice(1)
    const Color = color[0].toUpperCase() + color.slice(1)
    const Variant = variant[0].toUpperCase() + variant.slice(1)

    return clsx(
      classes[base],
      classes[`${base}${Variant}`],
      classes[`${base}${Variant}Size${Size}`],
      classes[`${base}${Variant}Color${Color}`],
    )
  }

  return (
    <Snackbar
      {...snackbarProps}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showSnackbar}
      autoHideDuration={autoHide ? 6000 : null}
      classes={{
        root: classes.snackbarRoot,
        anchorOriginBottomCenter: classes.anchorOriginBottomCenter,
      }}
    >
      <SnackbarContent
        classes={{
          root: clsxBonus('root'),
          message: clsxBonus('message'),
          action: clsxBonus('action'),
        }}
        message={
          <>
            <div className={classes.children}>{children}</div>
            {action && <div className={classes.actionButton}>{action}</div>}
            <div className={classes.closeButton}>
              <Fab aria-label='Close snackbar' size='medium' onClick={() => setSnackbar(false)}>
                <CloseIcon />
              </Fab>
            </div>
          </>
        }
      />
    </Snackbar>
  )
}
