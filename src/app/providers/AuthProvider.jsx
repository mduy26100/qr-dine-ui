import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
    getToken, getUser, setToken, setUser as setStorageUser, clearAuth,
    isTokenExpired, getUserRoles, clearGlobalCache
} from '../../infrastructure';
import { SYSTEM_ROLE } from '../../shared/constants';

const AuthContext = createContext(null);

const ALLOWED_ROLES = [SYSTEM_ROLE.SUPPER_ADMIN, SYSTEM_ROLE.MERCHANT, SYSTEM_ROLE.STAFF];

export const AuthProvider = ({ children }) => {
    const [user, setCurrentUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initAuth = () => {
            const token = getToken();
            const savedUser = getUser();
            const roles = getUserRoles();

            const hasPermission = roles.some(role => ALLOWED_ROLES.includes(role));

            if (token && savedUser && !isTokenExpired(token) && hasPermission) {
                setCurrentUser(savedUser);
            } else {
                handleLogout(); 
            }
            setIsInitialized(true);
        };

        initAuth();
    }, []);

    const handleLogin = (accessToken, userPayload) => {
        setToken(accessToken);
        setStorageUser(userPayload);
        setCurrentUser(userPayload);
    };

    const handleLogout = () => {
        clearGlobalCache();
        clearAuth();
        setCurrentUser(null);
    };

    const value = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        isInitialized,
        login: handleLogin,
        logout: handleLogout,
        hasRole: (roleName) => user?.roles?.includes(roleName) || false
    }), [user, isInitialized]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
