import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from 'src/components/Header/Header'
import { ProductOfViews } from 'src/features'
import Banner from 'src/features/home/Components/Banner'

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
      <Header />
      <div style={{ minHeight: '80vh', paddingTop: 100 }}>
        <Banner />
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
