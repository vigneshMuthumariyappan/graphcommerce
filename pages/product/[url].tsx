import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getHeaderProps from 'components/Header/getHeaderProps'
import getProductPageProps, { GetProductPageProps } from 'components/ProductPage/getProductProps'
import useCategoryPageStyles from 'components/CategoryPage/useCategoryPageStyles'
import { Container } from '@material-ui/core'
import clsx from 'clsx'
import overlay from 'components/PageTransition/overlay'
import { useHeaderSpacing } from 'components/Header/useHeaderSpacing'
import NextError from 'next/error'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'

const ProductPage: PageWithShopLayout<GetProductPageProps> = (props) => {
  const { products } = props
  const classes = useCategoryPageStyles(props)
  const { marginTop } = useHeaderSpacing()

  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const {
    items: [product],
  } = products

  if (!product) return <NextError statusCode={404} title='Product not found' />

  return (
    <div style={{ height: 400, backgroundColor: 'red' }}>
      <Container className={clsx(classes.container, marginTop)}>
        <img src={product.small_image.url} alt='' style={{ width: 500 }} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        hoi
      </Container>
    </div>
  )
}

ProductPage.Layout = ShopLayout
ProductPage.pageTransition = overlay

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'ninebot-by-segway-kickscooter-es1' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetProductPageProps,
  { url: string }
> = async (ctx) => {
  if (!ctx.params?.url) throw Error('No params')

  const config = getStoreConfig()
  const urlResolve = getUrlResolveProps({
    urlKey: ctx.params.url + ((await config).storeConfig.product_url_suffix ?? ''),
  })
  const navigation = getHeaderProps()
  const productPage = getProductPageProps({ urlKey: ctx.params.url })

  return {
    props: {
      ...(await urlResolve),
      ...(await navigation),
      ...(await productPage),
    },
  }
}
