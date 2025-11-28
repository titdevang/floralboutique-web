export function getGuestToken() {
    let token = localStorage.getItem('guest_token') || undefined;
    return token;
}
