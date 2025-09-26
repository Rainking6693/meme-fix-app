import { useState, useEffect } from 'react'
import MemeForm from './components/MemeForm'
import MemeDisplay from './components/MemeDisplay'

function App() {
  const [memeData, setMemeData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleGenerateMeme = async (expense) => {
    setLoading(true)
    setError(null)
    setMemeData(null)
    setShowConfetti(false)

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
      
      // Trigger confetti animation
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      
    } catch (err) {
      console.error('Error generating meme:', err)
      setError(err.message || 'Failed to generate meme. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Confetti component
  const Confetti = () => (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div key={i} className="confetti" 
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="skeleton-container">
      <div className="skeleton skeleton-caption"></div>
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-buttons">
        <div className="skeleton skeleton-button"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  )

  return (
    <div className="app-container">
      <div className="animated-bg"></div>
      
      {showConfetti && <Confetti />}
      
      <div className="app-card">
        <header className="app-header">
          <h1 className="app-title">
            <span className="emoji-bounce">🤣</span> CryLessMemes
          </h1>
          <p className="app-tagline">
            Turn your bad spending into memes worth sharing.
          </p>
        </header>
        
        <MemeForm onSubmit={handleGenerateMeme} loading={loading} />
        
        {error && (
          <div className="error-message">
            <span className="error-icon">😅</span>
            <p>{error}</p>
          </div>
        )}
        
        {loading && <SkeletonLoader />}
        
        {memeData && !loading && (
          <MemeDisplay 
            caption={memeData.caption} 
            imageUrl={memeData.url}
            showConfetti={showConfetti}
          />
        )}
        
        <footer className="app-footer">
          <p>Made with 💜 and questionable financial decisions</p>
        </footer>
      </div>
    </div>
  )
}

export default App