import React, { PropsWithChildren } from 'react'
import CartIcon from '@material-ui/icons/ShoppingCartOutlined'
import {
  Fab,
  FabProps,
  makeStyles,
  Menu,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  Divider,
  Badge,
} from '@material-ui/core'
import { vpCalc } from 'components/Theme'
import Close from '@material-ui/icons/Close'

const useStyles = makeStyles(
  {
    menu: { minWidth: vpCalc(200, 280) },
  },
  { name: 'CartSkeleton' },
)

type CartSkeletonProps = PropsWithChildren<
  Omit<FabProps, 'size'> & { badgeContent?: React.ReactNode }
>

const CartSkeleton = React.forwardRef<HTMLButtonElement, CartSkeletonProps>(
  ({ children, badgeContent, ...fabProps }, ref) => {
    const classes = useStyles()
    const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

    return (
      <>
        <Badge badgeContent={badgeContent} color='primary' overlap='circle'>
          <Fab
            aria-label='Open Cart'
            size='medium'
            {...fabProps}
            onClick={(event) => setOpenEl(event.currentTarget)}
            ref={ref}
          >
            <CartIcon fontSize='small' />
          </Fab>
        </Badge>
        <Menu
          anchorEl={openEl}
          open={!!openEl}
          onClose={() => setOpenEl(null)}
          keepMounted
          variant='menu'
          classes={{ paper: classes.menu }}
        >
          <ListItem>
            <ListItemIcon>
              <IconButton edge='end' aria-label='close' onClick={() => setOpenEl(null)}>
                <Close fontSize='small' />
              </IconButton>
            </ListItemIcon>
            <ListItemText>Cart</ListItemText>
          </ListItem>
          <Divider variant='inset' component='li' />
          {children}
        </Menu>
      </>
    )
  },
)

export default CartSkeleton
