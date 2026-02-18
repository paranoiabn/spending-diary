
type CategorySelectProps = {
  categories: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCategory: string;
};

function CategorySelect ({ categories, onChange, selectedCategory }: CategorySelectProps) {
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