    function TotalsByCategory ({ totalCsv, totalsByCategory }) {
        return (
            <>
            <h3>Итоги: {totalCsv}</h3>
      <div style={{ marginTop: 8 }}>
        <strong>По категориям:</strong>
        <ul>
          {Object.entries(totalsByCategory).map(([cat, sum]) => (
            <li key={cat}>{cat}: {sum}</li>
          ))}
        </ul>
      </div>
      </>
        )
    }

export default TotalsByCategory