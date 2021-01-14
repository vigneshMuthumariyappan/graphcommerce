import { makeStyles, Theme } from '@material-ui/core'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React from 'react'
import { ImageSwatchDataFragment } from './ImageSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      height: responsiveVal(40, 80),
      width: responsiveVal(40, 80),
      border: `3px solid ${theme.palette.grey[300]}`,
      boxSizing: 'border-box',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    sizeSmall: {
      width: 20,
      height: 20,
    },
  }),
  { name: 'ImageSwatchData' },
)
type ImageSwatchDataProps = ImageSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function ImageSwatchData(props: ImageSwatchDataProps) {
  const classes = useStyles(props)
  const { value, thumbnail, store_label, size } = props
  return (
    <>
      {thumbnail ? (
        <PictureResponsiveNext
          src={thumbnail}
          type='image/jpeg'
          width={classes.sizeSmall ? 20 : 40}
          height={classes.sizeSmall ? 20 : 40}
          alt={value ?? ''}
          className={clsx({
            [classes.root]: true,
            [classes.sizeSmall]: size === 'small',
          })}
        />
      ) : (
        <div>{store_label}</div>
      )}
    </>
  )
}