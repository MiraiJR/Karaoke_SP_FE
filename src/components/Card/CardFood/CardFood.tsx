import Image from "next/image";

interface ICardFood {
    image: string;
    name: string;
    price: number;
    ordered: number;
    unit: string;
}

const CardFood = ({ name, image, price, ordered, unit }: ICardFood) => {

    return (
        <>
            <div className="card-food">
                <div className="card-food_thumb">
                    <Image src={image} alt='' width={100} height={100}></Image>
                </div>
                <div className="card-food_name">{name}</div>
                <div className="card-food_detail">
                    <div>
                        <span>
                            Đơn giá
                        </span>
                        <span>{`${price} VNĐ`}</span>
                    </div>
                    <div>
                        <span>
                            Đã bán
                        </span>
                        <span>{`${ordered} ${unit}`}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardFood;