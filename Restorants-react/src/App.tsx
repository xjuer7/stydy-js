import { RestaurantsPage } from './pages/Restaurants/RestaurantsPage'
import { Logo } from './ui/Logo/Logo' 
import { Profile } from './ui/Profile/Profile' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles.css'

export const queryClient = new QueryClient()

function App() {
  return (
    <>
      <header>
        <Logo />
        <Profile />
      </header>
      <main>
        <section className="list">
          <div className="container">
          <QueryClientProvider client={queryClient}>
            <RestaurantsPage />
          </QueryClientProvider>
          </div>
        </section>
      </main>
      <footer>
        <p>Privacy Policy</p>
        <p className="corporation">2022 Eats</p>
        <p>Terms Of Service</p>
      </footer>
    </>
  )
}

export default App
