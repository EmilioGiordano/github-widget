import { useState } from 'react'
import GitHubContributions from './components/GitHubContributions'
import { themes } from './components/themes'
import './App.css'

function App() {
  const themeKeys = Object.keys(themes)
  const [username, setUsername] = useState('EmilioGiordano')
  
  return (
    <div className="app">
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        Mis Contribuciones de GitHub
      </h1>
      
      <div className="username-input-container">
        <label htmlFor="github-username">Usuario de GitHub</label>
        <input
          id="github-username"
          className="username-input"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="ej. octocat"
          autoComplete="off"
        />
      </div>
      
      {themeKeys.map((themeKey) => (
        <div key={themeKey} style={{ marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#c9d1d9' }}>
            {themes[themeKey].displayName}
          </h2>
          <GitHubContributions theme={themeKey} username={username.trim() || undefined} />
        </div>
      ))}
    </div>
  )
}

export default App

