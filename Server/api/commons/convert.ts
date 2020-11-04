//
export const getSort: (
  sort: Array<{ name: string; desc: boolean }>
) => Record<string, number> = sort => {
  return sort.reduce((a, b) => {
    return { ...a, [b.name]: b.desc ? -1 : 1 }
  }, {})
}
