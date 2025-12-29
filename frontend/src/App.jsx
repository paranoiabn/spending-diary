import { useState, useEffect } from 'react'
import { API_URL } from './api'
import './App.css'
import { calculateTotals } from './utils/totals';
import { getCategories } from './utils/categories';
import { filterByCategory } from './utils/filter';
import ExpensesList from './components/ExpensesList';
import { parseCsv } from './utils/csv';
import AddExpense from './components/AddExpense';
import TotalsByCategory from './components/TotalsByCategory';
import ManualExpensesSection from './components/ManualExpensesSection';
import FileUpLoad from './components/FileUpLoad';
import ExpensesTable from './components/ExpensesTable';
import CategorySelect from './components/CategorySelect';
 
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

  const allExpenses = [...csvExpenses, ...expenses, ...manualExpenses];

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

  useEffect(() => {
    const totalsResult = calculateTotals(allExpenses)
    setTotals(totalsResult)
  }, [csvExpenses, manualExpenses]);

  // подсчет manuelExpenses

  const addManualExpense = (expense) => {
    setManualExpenses(prev => [...prev, expense])
  }


  // отображаем список расходов


  const handleFile = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
      Array.from(files).forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const csvText = reader.result;
        // setText(csvText); // ✅ сохраняем сырой CSV в state
        const parsed = parseCsv(csvText)
        setCsvExpenses(prev => [...prev, ...parsed]); // ✅ сохраняем таблицу
      };
      
      reader.readAsText(file);
    });
  };
  
  // форма


    
  // const allExpenses = [...csvExpenses, ...expenses];

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


  const categories = getCategories(allExpenses);

  const filteredExpenses = filterByCategory(
    allExpenses,
    selectedCategory
  );

  const csvText = `
  data,category,amount
  2025-12-01,Food,520
  2025-12-02,Games,999
  2025-12-03,Food,300
  `

  console.log(expenses);
  console.log(totals.byCategory);
  

  const mergedExpenses = Object.entries(totals.byCategory).map(
    ([category, amount]) => ({ category, amount })
  );
  

  return (
      <div style={{ padding: 20 }}>
        <FileUpLoad handleFile={handleFile}/>

      <h3>Сырый текст CSV</h3>
      <pre style={{ maxHeight: 200, overflow: "auto" }}>{text}</pre>

      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      />

      <ExpensesTable expenses={allExpenses} />

      <TotalsByCategory
        totalCsv={totalCsv}
        totalsByCategory={totals.byCategory}
      />

    <ManualExpensesSection
        addManualExpense={addManualExpense}
        manualExpenses={manualExpenses}
        hasExpenses={hasExpenses}
        todayExpenseData={todayExpense}
        totalManual={totalManual}
    />
  </div>
  );
}

export default App
