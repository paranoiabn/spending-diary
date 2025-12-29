// function CategorySelect ({ addManualExpense, manualExpenses, todayExpense }) {
//     return (
//         <>
//         <AddExpense onAdd={addManualExpense} />
// <ExpensesList expenses={manualExpenses} />
// <div style={{ marginTop: 20 }}>
// {!hasExpenses && (
// <p>Расходов пока нет</p>
// )}

// {todayExpense && (
// <p>
// Сегодня: {todayExpense.category} — {todayExpense.amount}
// </p>
// )}
// </div>
// <div><strong>Итого:</strong> {totalManual}</div>
// </>
//     )
// }

function CategorySelect ({ categories, onChange, selectedCategory }) {
    return (
        <div>
        <select 
          value={selectedCategory}
          onChange={onChange}
        >
          <option value="all">Все</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
        </select>
      </div>
    )
}

export default CategorySelect