import dynamic from 'next/dynamic'
import { JoditProps } from 'jodit-react'

const Editor = dynamic<JoditProps>(() => import('jodit-react').then((mod) => mod), {
  ssr: false,
})

export default Editor
