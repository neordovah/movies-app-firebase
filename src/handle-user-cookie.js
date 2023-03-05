import Cookies from "js-cookie"


export const getCookie =  () => {
    let user = Cookies.get("user")
    if(user) {
        user = JSON.parse(user)
    return user
    }
    return
}

export const setCookie =  (user) => {
    Cookies.set("user", JSON.stringify(user))
}
