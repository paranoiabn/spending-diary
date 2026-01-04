export function parseCsv(csvText) {
            const lines = csvText.split("\n");
            const dataLines = lines.slice(1);
        
            // получаем текущую дату в формате
            const today = new Date().toISOString().slice(0, 10);
            console.log('Дата для всех объектов:', today);

            const parsed = dataLines
            .filter(line => line.trim() !== "")
            .map(line => {
              // проверяем сколько колонок
              const parts = line.split(",");
              // если 2 колонки
              if (parts.length === 2) {
                const [category, amount] = parts;
                return {
                  date: today,
                  category: category.trim(),
                  amount: Number(amount.trim())
                };
              }
              // если 3 колонки
              if (parts.length === 3) {
                const [date, category, amount] = parts;
                return {
                  date: date.trim(),
                  category: category.trim(),
                  amount: Number(amount.trim())
                };
              }
              // если форма не подходит - возвращаем
              return null;
            })
            .filter(item => item !== null);
            
            return parsed; // возвращаем данные
}