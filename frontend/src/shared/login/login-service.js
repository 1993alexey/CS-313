export function login(username) {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: username
  }).then(res => {
    if (!res.ok)
      return null
    return res.text()
  }).then (res => {
    if (!res)
      return null
    sessionStorage.setItem('user', res)
    return JSON.parse(res)
  })
}

export function logout() {
  return fetch('/api/auth/logout', {
    method: 'POST',
  }).then(res => {
    if (!res.ok)
      throw new Error('Failed to sign out the user')

    sessionStorage.removeItem('user')
    return true
  })
}
