function ExpensesList({ expenses }) {
    return (
      <ul>
        {expenses.map((e, idx) => (
          <li key={idx}>
            {e.date} - {e.category} - {e.amount}
          </li>
        ))}
      </ul>
    )
  }

export default ExpensesList