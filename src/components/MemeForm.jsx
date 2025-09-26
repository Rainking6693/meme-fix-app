import { useState } from 'react'

function MemeForm({ onSubmit, loading }) {
  const [expense, setExpense] = useState('')
  const [inputFocus, setInputFocus] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!expense.trim()) {
      // Custom alert animation
      const input = e.target.querySelector('input')
      input.classList.add('shake')
      setTimeout(() => input.classList.remove('shake'), 500)
      return
    }
    
    onSubmit(expense)
    setExpense('')
  }

  return (
    <form className="meme-form" onSubmit={handleSubmit}>
      <div className={`form-group ${inputFocus ? 'focused' : ''}`}>
        <div className="input-wrapper">
          <span className="input-icon">💸</span>
          <input
            type="text"
            id="expense"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            placeholder='e.g., I spent $500 on coffee'
            disabled={loading}
            autoComplete="off"
            className="expense-input"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className={`generate-button ${loading ? 'loading' : ''}`} 
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="button-spinner"></span>
            <span>Creating your masterpiece...</span>
          </>
        ) : (
          <>
            <span className="button-icon">🌈</span>
            <span>Generate Meme</span>
          </>
        )}
      </button>
      
      {!loading && !expense && (
        <p className="form-hint">
          💡 Pro tip: The more ridiculous the expense, the better the meme!
        </p>
      )}
    </form>
  )
}

export default MemeForm