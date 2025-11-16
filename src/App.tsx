import GitHubContributions from './components/GitHubContributions'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        Mis Contribuciones de GitHub
      </h1>
      
      <GitHubContributions />
    </div>
  )
}

export default App

