import { useState, useEffect } from 'react'
import { API_URL } from './api'
import './App.css'

function App() {
  const [ping, setPing] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [totals, setTotals] = useState({ total: 0, byCategory: {} });
  const [data, setData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [csvExpenses, setCsvExpenses] = useState([]);
  const [manualExpenses, setManualExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // useEffect(() => {
  //   fetch(`${API_URL}/ping`)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error("Server error");
  //       }
  //       return res.json();
  //     })
  //     .then(data => setPing(JSON.stringify(data)))
  //     .catch(err => setPing("Error: " + err.message));
  // }, []);

// загружаем из localstorage при старте
  useEffect(() => {
    const saved = localStorage.getItem('expenses')
    if (saved) setExpenses(JSON.parse(saved))
  }, [])

// сохраняем в localstorage при изменении
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => {
    // добавляем новый расход
    setExpenses(prev => [...prev, expense])
  }

  // подсчет manuelExpenses

  const addManulExpense = (expense) => {
    setManualExpenses(prev => [...prev, expense])
  }


  // отображаем список расходов

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

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const csvText = reader.result;
      setText(csvText); // ✅ сохраняем сырой CSV в state
  
      const lines = csvText.split("\n");
      const dataLines = lines.slice(1);
  
      const parsed = dataLines
      .filter(line => line.trim() !== "")
      .map(line => {
        const [date, category, amount] = line.split(",");
  
        return {
          date: date.trim(),
          category: category.trim(),
          amount: Number(amount.trim())
        };
      });
  
      setCsvExpenses(parsed); // ✅ сохраняем таблицу
    };
  
    reader.readAsText(file);
  };
  
  // форма

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
    
  const hasExpenses = expenses.some((expense) => {
    if ( expense.amount > 0) {
      return true;
    }
  });

  const today = new Date().toISOString().slice(0,10);

  const todayExpense = expenses.find((expense) => {
    if (expense.date === today) {
      return true;
    }
  });

  const totalCsv = csvExpenses.reduce((sum, e) => {
    return sum + e.amount
  }, 0);

  console.log(expenses, 'expenses');

  const totalManual = manualExpenses.reduce((sum, e) => {
    return sum + e.amount
  }, 0);

  const totalByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category
    const amount = expense.amount

    if(!acc[category]) {
      acc[category] = 0
    }
    
    acc[category] += amount
    return acc
  }, []);

  const categories = Array.from(
    new Set(expenses.map(e => e.category))
  );

  const filteredExpenses = selectedCategory === 'all' 
    ? expenses
    : expenses.filter(expense => expense.category === categories)

  const csvText = `
  data,category,amount
  2025-12-01,Food,520
  2025-12-02,Games,999
  2025-12-03,Food,300
  `

  

  return (
<div style={{ padding: 20 }}>
      <h2>Загрузить CSV</h2>
      <input type="file" accept=".csv" onChange={handleFile} />

      <h3>Сырый текст CSV</h3>
      <pre style={{ maxHeight: 200, overflow: "auto" }}>{text}</pre>

      <h3>Таблица</h3>
      <div className='my_table'>
        <table border="1" cellPadding="6" >
          <thead>
            <tr>
              <th>Время</th>
              <th>Категория</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {csvExpenses.map((row, idx) => (
              <tr key={idx}>
                <td>{row.date}</td>
                <td>{row.category}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">Все</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}  
        </select>
      </div>

      <h3>Итоги: {totalCsv}</h3>
      <div style={{ marginTop: 8 }}>
        <strong>По категориям:</strong>
        <ul>
          {Object.entries(totals.byCategory).map(([cat, sum]) => (
            <li key={cat}>{cat}: {sum}</li>
          ))}
        </ul>
      </div>
      <div>
        <AddExpense onAdd={addManulExpense} />
        <ExpensesList expenses={manualExpenses} />
      </div>
      <div style={{ marginTop: 20 }}>
  {!hasExpenses && (
    <p>Расходов пока нет</p>
  )}

  {todayExpense && (
    <p>
      Сегодня: {todayExpense.category} — {todayExpense.amount}
    </p>
  )}
</div>
  <div><strong>Итого:</strong> {totalManual}</div>
    </div>
  );
}

export default App
