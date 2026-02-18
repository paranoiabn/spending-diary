import AddExpense from "./AddExpense"
import ExpensesList from "./ExpensesList"
import ManualSection from './styles/ManualSection.module.scss';

type Expense = {
    date: string;
    category: string;
    amount: number;
};

type ManualExpensesSectionProps = {
    addManualExpense: (expense: Expense) => void;
    deleteManualExpense: (index: number) => void;
    manualExpenses: Expense[];
    hasExpenses: boolean;
    todayExpenseData: Expense | undefined;
    totalManual: number;
};

function ManualExpensesSection ({ addManualExpense, deleteManualExpense, manualExpenses, hasExpenses, todayExpenseData, totalManual }: ManualExpensesSectionProps) {
    return (
        <>
            <div className={ManualSection.manualContainer}>
                <AddExpense onAdd={addManualExpense} />
            </div >
            <ExpensesList
                csvExpenses={manualExpenses}
                onDelete={deleteManualExpense}
            />
</>

    )
}

export default ManualExpensesSection