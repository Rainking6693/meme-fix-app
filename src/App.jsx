import { useState } from 'react'
import MemeForm from './components/MemeForm'
import MemeDisplay from './components/MemeDisplay'

function App() {
  const [memeData, setMemeData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerateMeme = async (expense) => {
    setLoading(true)
    setError(null)
    setMemeData(null)

    try {
      const response = await fetch('/api/generateMeme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expense }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(errorData || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMemeData(data)
    } catch (err) {
      console.error('Error generating meme:', err)
      setError(err.message || 'Failed to generate meme. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>MemeFixApp</h1>
        <p>Turn your bad spending decisions into good memes!</p>
      </header>
      
      <MemeForm onSubmit={handleGenerateMeme} loading={loading} />
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Generating your meme...</p>
        </div>
      )}
      
      {memeData && !loading && (
        <MemeDisplay caption={memeData.caption} imageUrl={memeData.url} />
      )}
    </div>
  )
}

export default App