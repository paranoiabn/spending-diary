export function getCategories (expenses) {
    return Array.from(
        new Set(expenses.map(e => e.category))
      );
}