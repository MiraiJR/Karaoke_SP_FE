import Image from "next/image";
import style from './style.module.sass';
import { useDispatch, useSelector } from "react-redux";
import { orderFoodRoom, updatePayment } from "@/services/backend/API";
import { orderFood } from "@/redux/Room/RoomOpen.reducer";

interface IOrderFood {
    id: number;
    name: string;
    price: number;
    image: string;
}

const CardOrderFood = ({ id, name, image, price }: IOrderFood) => {
    const room = useSelector((state: any) => state.room_open.room);
    const dispatch = useDispatch();
    
    const orderFoodForRoom = async () => {
        const new_order = await orderFoodRoom(room.id, id, 1);

        dispatch(orderFood(new_order.data.result));
        
        updatePayment(room.id);
    }

    return (
        <>
            <div className="card-food" onClick={() => orderFoodForRoom()}>
                <div className={style.thumb}>
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
                </div>
            </div>
        </>
    );
}

export default CardOrderFood;