import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getProductList } from 'src/api'
import { getInitialTokenProps } from 'src/commons'
import { Footer, Navbar } from 'src/components'
import { ProductOfViews } from 'src/features'

interface IProductProps {
  page: number
  category: number | string
}

const ProductPage: NextPage<IProductProps> = (props) => {
  const { page = 1, category } = props

  return (
    <>
      <Head>
        <title>Tri thức</title>
      </Head>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <ProductOfViews page={page} category={category} />
      </div>
      {/* <Footer /> */}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IProductProps> = async (ctx) => {
  //   const { token, user } = await getInitialTokenProps(ctx)
  //   const { page } = ctx.query
  //   const result = await getProductList({
  //     authen: token,
  //     limit: 10,
  //     skip: (page - 1) * 10,
  //     sort: [{ name: 'created_at', desc: true }],
  //     keyword: '',
  //   })
  return {
    props: {
      page: Number(ctx.query.page) || 1,
      category: (ctx.query.category as string) || '',
    },
  }
}

export default ProductPage
