import GitHubContributions from './components/GitHubContributions'
import { themes } from './components/themes'
import './App.css'

function App() {
  const themeKeys = Object.keys(themes)
  
  return (
    <div className="app">
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        Mis Contribuciones de GitHub
      </h1>
      
      {themeKeys.map((themeKey) => (
        <div key={themeKey} style={{ marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#c9d1d9' }}>
            {themes[themeKey].displayName}
          </h2>
          <GitHubContributions theme={themeKey} />
        </div>
      ))}
    </div>
  )
}

export default App

