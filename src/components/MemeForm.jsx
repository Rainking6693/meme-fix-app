import { useState } from 'react'

function MemeForm({ onSubmit, loading }) {
  const [expense, setExpense] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!expense.trim()) {
      alert('Please enter an expense description!')
      return
    }
    
    onSubmit(expense)
    setExpense('')
  }

  return (
    <form className="meme-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="expense">
          What did you spend money on? 
        </label>
        <input
          type="text"
          id="expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          placeholder='e.g., "I spent $500 on coffee"'
          disabled={loading}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Meme'}
      </button>
    </form>
  )
}

export default MemeForm