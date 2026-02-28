import PrivateRoute from "./PrivateRoute";

const RoleRoute = ({ roles, children }) => {
    return (
        <PrivateRoute allowedRoles={roles}>
            {children}
        </PrivateRoute>
    );
};

export default RoleRoute;