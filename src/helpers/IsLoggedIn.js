import { isExpired } from 'react-jwt'

export const isLoggedIn = () => {
  const token = localStorage.getItem('token')
  // alert(token)
  if (token !== null) {
    try {
      const isMyTokenExpired = isExpired(token)
      console.log(isMyTokenExpired)
      // Check if token expiry
      if (!isMyTokenExpired) {
        return true
      } else {
        localStorage.clear()
        return false
      }
    } catch (error) {
      localStorage.clear()
      return false
    }
  } else {
    localStorage.clear()
    return false
  }
}