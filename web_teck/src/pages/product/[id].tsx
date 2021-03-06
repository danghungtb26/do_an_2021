import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Header from 'src/components/Header/Header'
import ProductDetail from 'src/features/ProductDetail'

interface IProductDetailPageProps {
  id: string | number
}

const ProductDetailPage: NextPage<IProductDetailPageProps> = (props) => {
  const { id } = props
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh' }}>
        <ProductDetail id={id} />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IProductDetailPageProps> = async (ctx) => {
  const { id } = ctx.query
  return {
    props: {
      id: `${id}`,
    },
  }
}

export default ProductDetailPage
