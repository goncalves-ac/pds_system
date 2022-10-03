export const stringOrNumber = (value?: string | number, field?: string) => {
    let res: string | undefined = undefined

    if (value) { res = `${value}` }

    if (typeof value === 'number') { res += 'px' }

    if (field) { return res ? `${field}: ${res};` : '' }

    return res
}
