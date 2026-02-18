import DeleteButton from "./DeleteButton"

type Expense = {
  date: string;
  category: string;
  amount: number;
};

type ExpensesListProps = {
  csvExpenses: Expense[];
  onDelete: (index: number) => void;
};

function ExpensesList({ csvExpenses, onDelete }: ExpensesListProps) {
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