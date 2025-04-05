import './App.css';
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  )
}

export default App
