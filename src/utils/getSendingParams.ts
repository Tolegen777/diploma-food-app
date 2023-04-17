export const getSendingParams = <Params extends Object>(params?: Params) => {
    if (params) {
        const queries = Object.values(params).map((item, ind) => {
            if (item && item !== '') {
                return `${Object.keys(params)[ind]}=${item}`
            } else return ''
        }).filter(item => item).join('&')
        return queries
    } else return ''
}