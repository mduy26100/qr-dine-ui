import { AuthProvider } from "./contexts"
import { AppRouter } from "./routes"

const App = () => {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}

export default App
