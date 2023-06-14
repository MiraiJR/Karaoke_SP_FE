interface ICardStatistic {
    label: string;
    value: number;
}

const CardStatistic = ({ label, value }: ICardStatistic) => {
    return (
        <>
            <div className="cardstatistic">
                <div className="cardstatistic-header">
                    {label}
                </div>
                <div className="cardstatistic-body">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                </div>
            </div>
        </>
    );
}

export default CardStatistic;