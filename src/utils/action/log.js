export const loginaction = (username) => ({
    type: 'login',
    payload: {
        username: username,
    }
})
export const logoutaction = () => ({
    type: 'logout',
    payload: {
        token: '',
    }  
})

