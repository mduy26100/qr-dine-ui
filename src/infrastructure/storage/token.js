import { jwtDecode } from "jwt-decode"
import { getToken, getUser } from "./storage"

export const decodeToken = (token) => {
  try {
    return jwtDecode(token)
  } catch {
    return null
  }
}

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token)
  if (!decoded?.exp) return true
  return decoded.exp * 1000 < Date.now()
}

export const getUserRoles = () => {
  const user = getUser()
  if (user?.roles) {
    return Array.isArray(user.roles) ? user.roles : [user.roles]
  }

  const token = getToken()
  if (!token) return []

  const decoded = decodeToken(token)
  if (!decoded) return []

  const roles =
    decoded.role ??
    decoded.roles ??
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
    []

  return Array.isArray(roles) ? roles : [roles]
}

export const hasRole = (roleName) => {
  return getUserRoles().includes(roleName)
}
