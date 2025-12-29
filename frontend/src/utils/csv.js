export function parseCsv(csvText) {
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
            
            return parsed; // возвращаем данные
}