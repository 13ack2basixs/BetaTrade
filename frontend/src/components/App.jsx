import AppRoutes from '../routes/AppRoutes'
import { UserProvider } from '../context/UserContext';

function App() {

// was -3.5rem
  return (
    <div style={{marginTop : '0rem'}}>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </div>
  )
}

export default App
