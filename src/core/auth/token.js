import { jwtDecode } from "jwt-decode"
import { STORAGE_KEYS } from "../constants"

export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
}

export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
}

export const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER)
  if (!user) return null
  try {
    return JSON.parse(user)
  } catch {
    return null
  }
}

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER)
}

export const clearAuth = () => {
  removeToken()
  removeUser()
}

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
  if (user && user.roles) {
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