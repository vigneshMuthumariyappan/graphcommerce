import {
  IconSvg,
  iconChevronRight,
  iconCustomerService,
  DarkLightModeMenuSecondaryItem,
  iconHeart,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button, List, ListItem, styled, SxProps, Theme, Typography } from '@mui/material'
import Link from 'next/link'
import { MegaMenuItemFragment } from '../../queries/MegaMenuItem.gql'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'

const buttonStyle: SxProps<Theme> = () => ({
  minWidth: 200,
  mr: 4,
  ml: 4,
  justifyContent: 'space-between',
  borderRadius: 0,
})

function PageLink(props: Pick<MegaMenuItemFragment, 'url_path' | 'name'>) {
  const { url_path, name } = props

  return (
    <Link href={`/${url_path}`} passHref>
      <Button variant='text' sx={buttonStyle} size='large'>
        {name}
      </Button>
    </Link>
  )
}

export function MenuList(
  props: Omit<MegaMenuItemFragment, 'uid'> & {
    addLevel: boolean
    level?: number
    open?: string
    setOpen: (any) => void
  },
) {
  const { name, children, url_path, addLevel, level = 0, open = '', setOpen } = props

  const viewOpen = (url: string) => {
    if (!open.includes(`/#/${url}`)) {
      setOpen(url === '/#' ? url : `/#/${url}`)
    }
  }
  const filteredChildren = children?.filter((item) => item?.include_in_menu === 1)
  const hasChildren = filteredChildren && filteredChildren.length > 0

  if (hasChildren) {
    return (
      <ListItem component='li' sx={{ display: 'contents' }}>
        <Box
          sx={{
            gridColumnStart: level + 1,
          }}
        >
          <Link href={`/${url_path}`} passHref>
            <Button
              variant='text'
              sx={buttonStyle}
              size='large'
              onClick={(e) => {
                if (viewOpen) {
                  viewOpen(url_path as string)
                }
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              {name}
              {/* {open.includes(`/${url_path}`) && <IconSvg src={iconChevronRight} />} */}
              <IconSvg src={iconChevronRight} />
            </Button>
          </Link>
        </Box>

        <List
          component='ul'
          sx={[
            {
              display: 'contents',
              zIndex: 1,
            },
            !open.includes(`/${url_path}`) && {
              display: 'block',
              zIndex: -1,
              position: 'absolute',
              left: '-100%',
            },
          ]}
        >
          {url_path !== '#' && (
            <ListItem sx={{ gridColumnStart: level + 2, gridRowStart: 1, padding: 0 }}>
              <PageLink {...props} name={`All ${name}`} url_path={url_path} />
            </ListItem>
          )}

          {filteredChildren?.map((child) => (
            <MenuList
              {...child}
              level={level + 1}
              open={open}
              setOpen={setOpen}
              addLevel={addLevel}
            />
          ))}
        </List>
      </ListItem>
    )
  }

  if (!hasChildren) {
    return (
      <ListItem sx={{ gridColumnStart: level + 1, padding: 0 }} component='li'>
        <PageLink {...props} />
      </ListItem>
    )
  }

  return null
}

export function MegaMenu(
  props: MegaMenuQueryFragment & {
    addLevel: boolean
    sx?: SxProps<Theme>
    open?: string
    setOpen: (string) => void
  },
) {
  const { menu, open, addLevel, setOpen } = props

  const filteredMenu = menu?.items?.filter((item) => item?.include_in_menu === 1)

  return (
    <Box component='nav' id='main-nav' aria-label='Main'>
      <List disablePadding sx={{ display: 'grid', gridAutoFlow: 'column', padding: 4 }}>
        <ListItem sx={{ display: 'contents' }}>
          <Link href='/' passHref>
            <Button
              variant='text'
              sx={[
                { gridColumnStart: 1 },
                ...(Array.isArray(buttonStyle) ? buttonStyle : [buttonStyle]),
              ]}
              size='large'
            >
              Home
            </Button>
          </Link>
        </ListItem>

        {filteredMenu?.map((tree) => (
          <MenuList
            key={tree?.url_path}
            {...tree}
            level={0}
            open={open}
            setOpen={setOpen}
            addLevel={addLevel}
          />
        ))}
        <ListItem sx={{ display: 'contents' }}>
          <Link href='#' passHref>
            <Button
              variant='text'
              sx={[
                { gridColumnStart: 1 },
                ...(Array.isArray(buttonStyle) ? buttonStyle : [buttonStyle]),
              ]}
              size='large'
            >
              New
            </Button>
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}
