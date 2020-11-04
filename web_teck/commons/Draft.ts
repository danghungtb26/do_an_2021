import { EditorState, convertToRaw, ContentState } from 'draft-js'
import dynamic from 'next/dynamic'
import htmlToDraft from 'html-to-draftjs'

const aaaa = dynamic(() => import('html-to-draftjs').then((mod) => mod), {
  ssr: false,
}) as htmlToDraft

export const convertDraftToHtml = (state) => {
  const draftToHtml = require('draftjs-to-html')
  return draftToHtml(convertToRaw(state.getCurrentContent()))
}

export const convertHtmlToDraft = (html) => {
  const contentBlock = aaaa(html)
  console.log('convertHtmlToDraft -> contentBlock', contentBlock)
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }

  return html
}
