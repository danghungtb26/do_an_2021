import React from 'react'

import { useRouter } from 'next/router'

export default function Home2() {
  const router = useRouter()
  React.useEffect(() => {
    router.replace('/product')
  })
  return null
}
