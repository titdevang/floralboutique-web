import Cookies from "js-cookie";
export function getGuestToken() {
    let token = Cookies.get('guest_token') || undefined;
    return token;
}
