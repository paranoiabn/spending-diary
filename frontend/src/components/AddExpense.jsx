import { useState } from "react";

function AddExpense({ onAdd }) {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault()
      if (!date || !category || !amount) return

      onAdd({
        date,
        category,
        amount: Number(amount)
      })

      setDate('')
      setCategory('')
      setAmount('')
    }


    return (
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          />
        <input 
          type="text"
          placeholder='Category'
          value={category} 
          onChange={e => setCategory(e.target.value)}
          />
        <input
          type="number"
          placeholder='Amount'
          value={amount}
          onChange={e => setAmount(e.target.value)}
          />
        <button type='submit'>Add Expense</button>
      </form>
    )
  }

export default AddExpense 