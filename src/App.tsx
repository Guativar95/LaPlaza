import { AppProvider } from '@/providers/app'
import { AppRoutes } from '@/routes'

import './assets/global.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
