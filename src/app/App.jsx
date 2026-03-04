import { AuthProvider, useAuth } from "./providers";
import { AppRouter } from "./routes";
import { AUTH_STATUS } from "../shared/constants";

const AppContent = () => {
  const { authStatus } = useAuth();

  if (authStatus === AUTH_STATUS.CHECKING) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
          <p className="text-gray-600">Đang khôi phục phiên làm việc...</p>
        </div>
      </div>
    );
  }

  return <AppRouter />;
};

const App = () => {
  return (
    <>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </>
  );
};

export default App;
