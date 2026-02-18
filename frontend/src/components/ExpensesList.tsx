import DeleteButton from "./DeleteButton"

function ExpensesList({ csvExpenses, onDelete }) {
  if (!csvExpenses || !Array.isArray(csvExpenses)) {
    return <div>Нет данных</div>;
  }
    return (
      <ul style={{ color:'red' }}>
        {csvExpenses.map((e, idx) => (
          <li key={idx}>
            {e.date ? new Date(e.date).toLocaleDateString('ru-RU') : 'Нет даты'} - {e.category} - {e.amount}
            <DeleteButton
                onDelete={onDelete}
                expenseIndex={idx}
            />
          </li>
        ))}
      </ul>
    )
  }

export default ExpensesList