export const actionLogin = (value) => {
    return {
        type : 'login',
        payLoad : value
    }
}
export const actionLogout = (value) => {
    return {
        type : 'logout',
        payLoad : null
    }
}