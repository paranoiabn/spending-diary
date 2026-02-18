type TotalAmountProps = {
    total: number;
};

function TotalAmount({ total }: TotalAmountProps) {
    // if (total === null || total === 0) return null;

    return <h3>Итоги: {total}</h3>
}

export default TotalAmount;