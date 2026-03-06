import { useMovieStore } from './store/useMovieStore'
import { Header } from './components/Layout/Header'
import { Deck } from './components/Deck/Deck'
import { Watchlist } from './components/Watchlist/Watchlist'

function App() {
  const { activeTab } = useMovieStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <Header />
      <main className="w-full">
        {activeTab === 'deck' ? <Deck /> : <Watchlist />}
      </main>
    </div>
  )
}

export default App