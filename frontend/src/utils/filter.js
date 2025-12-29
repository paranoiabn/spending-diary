export function filterByCategory (expenses, selectedCategory) {
    return selectedCategory === 'all' 
    ? expenses
    : expenses.filter(e => e.category === selectedCategory)
}